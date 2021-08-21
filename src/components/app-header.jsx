import React from "react";
import { useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(
    (theme) => ({
        langSpan: {
            fontWeight: "bold",
            cursor: "pointer"
        },
        choosenLang: {
            textDecoration: "underline",

        }
    })
)

const AppHeader = () => {
    const [lang, setLang] = useState('עב');
    const classes = useStyles();
    return (<Box flexDirection="row" display="flex" alignItems="center" justifyContent="space-around">

        <h2>     קולות הציפורים בארץ ישראל</h2>
        <Box >

            <span id='hebrew' className={classes.langSpan + " " + lang === 'עב' ? classes.choosenLang : null}>
                עב
            </span> &nbsp;
            <span id='english' className={classes.langSpan + " " + lang === 'EN' ? classes.choosenLang : null} onClick={setLang('EN')}>
                EN
            </span>
        </Box>
    </Box>)
}

export default AppHeader