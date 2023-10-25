import { createRoot } from 'react-dom';

import "./style.scss";
import Style from "./Style";
import BarChart from './BarChart';

document.addEventListener("DOMContentLoaded", () => {
    const iframeEls = document.querySelectorAll(".wp-block-b-blocks-star-bar-chart");
    iframeEls.forEach((iframeEl) => {
        const attributes = JSON.parse(iframeEl.dataset.attributes);
        const { cId } = attributes;

        const root = createRoot(iframeEl);

        root.render(
            <>
                <Style attributes={attributes} clientId={cId} />
                <BarChart attributes={attributes} />
            </>
        );

        iframeEl?.removeAttribute("data-attributes");
    });
});
