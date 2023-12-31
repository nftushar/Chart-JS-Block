import { createRoot } from 'react-dom';

import "./style.scss";
import Style from "./Style";
import BarChart from './components/BarChart';

document.addEventListener("DOMContentLoaded", () => {
    const chartEls = document.querySelectorAll(".wp-block-b-blocks-bar-chart");
    chartEls.forEach((chartEl) => {
        const attributes = JSON.parse(chartEl.dataset.attributes);
        const { cId } = attributes;

        const root = createRoot(chartEl);

        root.render(
            <>
                <Style attributes={attributes} clientId={cId} />
                <BarChart attributes={attributes} />
            </>
        );

        chartEl?.removeAttribute("data-attributes");
    });
});
