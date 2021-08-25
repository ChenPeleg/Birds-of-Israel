import React, { Dispatch } from "react";
import { Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
//import { ClassNameMap } from "@material-ui/core/styles/withStyles";

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

    const lang = useSelector((state: { lang: string }) => state.lang);
    const dispatch: Dispatch<any> = useDispatch();
    const classes = useStyles();
    return (<Box flexDirection="row" display="flex" alignItems="center" justifyContent="space-around">

        <h2>     קולות הציפורים בארץ ישראל</h2>
        <Box >

            <span id='hebrew' className={`${classes.langSpan} ${lang === 'עב' ? classes.choosenLang : null}`} onClick={() => dispatch({ type: "LANG_HEB" })} >
                עב
            </span> &nbsp;
            <span id='english' className={`${classes.langSpan} ${lang === 'EN' ? classes.choosenLang : null}`} onClick={() => dispatch({ type: "LANG_EN" })}>
                EN
            </span>
        </Box>
    </Box>)
}

export default AppHeader
