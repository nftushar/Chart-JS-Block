import React, { useEffect } from "react";
import Settings from "./Settings";
import Style from "./Style";
import BarChart from './components/BarChart'; 
import PieChart from './components/PieChart'
import FakerChart from './components/FakerChart';

const Edit = (props) => {
  const { className, attributes, setAttributes, clientId } = props;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  return <>
    <Settings attributes={attributes} setAttributes={setAttributes} />

    <div className={className} id={`bBlocksBarChart-${clientId}`}>
      <Style attributes={attributes} clientId={clientId} />
      {/* <BarChart attributes={attributes} />  */}
      {/* <PieChart /> */}
      <FakerChart attributes={attributes}/>
      </div>
  </>;
};

export default Edit;