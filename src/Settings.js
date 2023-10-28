import { __ } from "@wordpress/i18n";
import React, { useState } from 'react';
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, FormFileUpload } from "@wordpress/components";

const readJSONFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsText(file);
  });
};

const readXMLFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const xmlData = new DOMParser().parseFromString(e.target.result, 'application/xml');
        const peopleElements = xmlData.querySelector('people');

        if (!peopleElements || peopleElements.children.length === 0) {
          reject('Invalid XML structure: Missing or empty <people> elements');
          return;
        }

        const people = Array.from(peopleElements.children).map((person) => ({
          label: person.querySelector('label')?.textContent,
          value: person.querySelector('value')?.textContent,
        }));
        resolve(people);
      } catch (error) {
        console.error('Error parsing XML:', error);
        reject(error);
      }
    };

    reader.readAsText(file);
  });
};

const readCSVFile = (csv) => {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      const key = headers[j].trim();
      const value = currentline[j].trim();
      obj[key] = value;
    }

    result.push(obj);
  }

  return result;
};

const Settings = ({ attributes, setAttributes }) => {
  const { jsonData: existingjsonData, xmlData: existingXmlData, csvData: existingCSVData } = attributes;
  const [jsonData, setJsonData] = useState(null);
  const [xmlData, setXmlData] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      try {
        const fileType = file.type.split('/')[1];

        if (fileType.toLowerCase() === 'json') {
          const jsonData = await readJSONFile(file);
          setJsonData(jsonData);
          setAttributes({ jsonData: jsonData.people, xmlData: [], csvData: [] });
        } else if (fileType.toLowerCase() === 'xml') {
          const xmlData = await readXMLFile(file);
          setXmlData(xmlData);
          setAttributes({ xmlData, jsonData: [], csvData: [] });
        } else if (fileType.toLowerCase() === 'csv') {
          const csvData = readCSVFile(await file.text());
          setCsvData(csvData);
          setAttributes({ csvData, jsonData: [], xmlData: [] });
        } else {
          console.error('Unsupported file format. Please upload a JSON, XML, or CSV file.');
        }
      } catch (error) {
        console.error('Error reading or parsing file:', error);
      }
    }
  };

  return (
    <InspectorControls>
      <TabPanel
        className="bPlTabPanel"
        tabs={[
          { name: "general", title: __("General") },
          { name: "style", title: __("Style") },
        ]}
      >
        {(tab) => (
          <>
            {tab.name === "general" && (
              <PanelBody
                className="bPlPanelBody"
                title={__("Settings", "bar-chart")}
              >
                <FormFileUpload
                  accept=".json, .xml, .csv"
                  onChange={handleFileUpload}
                >
                  Upload
                </FormFileUpload>
              </PanelBody>
            )}

            {tab.name === "style" && (
              <PanelBody
                className="bPlPanelBody"
                title={__("Title", "bar-chart")}
              >
                {/* Your style settings components go here */}
              </PanelBody>
            )}
          </>
        )}
      </TabPanel>
    </InspectorControls>
  );
};

export default Settings;
