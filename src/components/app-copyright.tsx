import React from "react";
import { useSelector } from "react-redux";
import { translate } from "../services/translateService";
import { Language } from "../models/languageEnum";


export const AppCopyright = (): JSX.Element => {

    const language = useSelector((state: { language: Language }) => state.language);
    const langDir = useSelector((state: { langDir: string }) => state.langDir);
    const copyrightText = translate(language, "Copyright")

    return (<div id="copyrights" dir={langDir} className="no-overflow">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &copy;
        {copyrightText}
        &nbsp;&nbsp;&nbsp;
    </div>)
}


