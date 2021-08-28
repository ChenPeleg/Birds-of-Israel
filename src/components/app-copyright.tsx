import React from "react";
import { useSelector } from "react-redux";
import { translate } from "../hoc/translateService";
import { Language } from "../models/languageEnumb";


export const AppCopyright = (): JSX.Element => {

    const language = useSelector((state: { language: Language }) => state.language);
    const langDir = useSelector((state: { langDir: string }) => state.langDir);
    const coptRightText = translate(language, "Copyright")

    return (<div id="copyrights" dir={langDir} className="no-overflow">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &copy;
        {coptRightText}
        &nbsp;&nbsp;&nbsp;
    </div>)
}


