import { __ } from "@wordpress/i18n";
import React, { useState } from 'react';
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, FormFileUpload } from "@wordpress/components";

const getFileExtension = (fileName) => {
  return fileName.split('.').pop();
};

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

const Settings = ({ attributes, setAttributes }) => {
  const { jsonData: existingjsonData, xmlData: existingXmlData } = attributes;
  const [jsonData, setJsonData] = useState(null);
  const [xmlData, setXmlData] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      try {
        const fileExtension = getFileExtension(file.name);

        if (fileExtension.toLowerCase() === 'json') {
          const jsonData = await readJSONFile(file);
          console.log(jsonData)
          setJsonData(jsonData);
          setAttributes({ jsonData: jsonData.people, xmlData: [] });
        } else if (fileExtension.toLowerCase() === 'xml') {
          const xmlData = await readXMLFile(file);
          setXmlData(xmlData);
          setAttributes({ xmlData, jsonData: [] });
        } else {
          console.error('Unsupported file format. Please upload a JSON or XML file.');
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
                title={__("Settings", "star-rating")}
              >
                <FormFileUpload
                  accept=".json, .xml"
                  onChange={handleFileUpload}
                >
                  Upload
                </FormFileUpload>
              </PanelBody>
            )}

            {tab.name === "style" && (
              <PanelBody
                className="bPlPanelBody"
                title={__("Title", "star-rating")}
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
