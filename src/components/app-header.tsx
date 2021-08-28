import React, { Dispatch } from "react";
import { Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import StopButton from "./stop-button";
import { translate } from "../hoc/translateService";
import { Language } from "../models/languageEnumb";


const useStyles: any = makeStyles(
    (theme: Theme) => ({
        langSpan: {
            fontWeight: "bold",
            cursor: "pointer"
        },
        choosenLang: {
            textDecoration: "underline",

        }
    })
)

/**  @param {any} [props] - Somebody's name.  @param {string}  p1  @returns {JSX.Element} */
const AppHeader = (): JSX.Element => {

    const language = useSelector((state: { language: Language }) => state.language);
    const dispatch: Dispatch<any> = useDispatch();
    const classes = useStyles();
    return (<Box flexDirection="row" display="flex" alignItems="center" justifyContent="space-around" dir={'rtl'}>

        <h2>  {translate(language, "header")}</h2>
        <StopButton></StopButton>
        <Box >

            <span id='hebrew' className={`${classes.langSpan} ${language === Language.he ? classes.choosenLang : null}`} onClick={() => dispatch({ type: "LANG_HEB" })} >
                עב
            </span> &nbsp;
            <span id='english' className={`${classes.langSpan} ${language === Language.en ? classes.choosenLang : null}`} onClick={() => dispatch({ type: "LANG_EN" })}>
                EN
            </span>
        </Box>
    </Box>)
}

export default AppHeader
