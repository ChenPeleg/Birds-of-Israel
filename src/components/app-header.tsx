import React, { Dispatch } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StopButton from "./stop-button";
import { translate } from "../services/translateService";
import { Language } from "../models/languageEnum";
import { AppAction } from "../store/reducer";
import { LANG_HEB, LANG_EN } from "../store/actionTypes";

/**  @param {any} [props] - Somebody's name.  @param {string}  p1  @returns {JSX.Element} */
const AppHeader = (): JSX.Element => {

    const language = useSelector((state: { language: Language }) => state.language);
    const dispatch: Dispatch<AppAction> = useDispatch();
    return (<Box flexDirection="row" flexWrap="wrap" display="flex" alignItems="center" justifyContent="space-around" dir={'rtl'}>

        <h2 style={{ marginTop: "0px", marginBottom: "0px" }}>  {translate(language, "header")}</h2>
        <Box flexDirection="row" flexGrow="4" display="flex" justifyContent="space-around">
            <StopButton></StopButton>
            <Box margin={'20px'} >

                <span id='hebrew' style={{ fontWeight: "bold", cursor: "pointer", textDecoration: language === Language.he ? "underline" : undefined }} onClick={() => dispatch({ type: LANG_HEB })} >
                    עב
                </span> &nbsp;
                <span id='english' style={{ fontWeight: "bold", cursor: "pointer", textDecoration: language === Language.en ? "underline" : undefined }} onClick={() => dispatch({ type: LANG_EN })}>
                    EN
                </span>
            </Box>
        </Box>
    </Box>)
}

export default AppHeader
