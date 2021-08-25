import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

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

/**  @param {any} [props] - Somebody's name.  @param {string}  p1  @returns {JSX.Element} */
const AppHeader = (props) => {

    const lang = useSelector(state => state.lang);
    const dispatch = useDispatch();
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
// const mapStateToProps = state => {
//     return {
//         lang: state.lang
//     }
// }
// const mapDispatchToProps = dispactch => {
//     return {
//         onChangeToHeb: () => dispactch({ type: "LANG_HEB" }),
//         onChangeToEN: () => dispactch({ type: "LANG_EN" })
//     }
// }
export default AppHeader
//export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)