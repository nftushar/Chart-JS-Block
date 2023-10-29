import React, { useEffect } from "react";
import Settings from "./Settings";
import Style from "./Style";
import BarChart from './BarChart'; 
import PieChart from './PieChart'

const Edit = (props) => {
  const { className, attributes, setAttributes, clientId } = props;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  return <>
    <Settings attributes={attributes} setAttributes={setAttributes} />

    <div className={className} id={`bBlocksBarChart-${clientId}`}>
      <Style attributes={attributes} clientId={clientId} />
      <BarChart attributes={attributes} /> 
      <PieChart />
      </div>
  </>;
};

export default Edit;
