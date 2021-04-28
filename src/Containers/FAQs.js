import React from "react";
import Header from "../Components/Header";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { MdKeyboardArrowDown } from "react-icons/md";
import Problem from "../Assets/Problem.svg";
import FaqData from "../Data/FaqData";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function FAQs() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <div className="listPageHeader">
        <Header />
      </div>
      <div className="faqimg">
        <img src={Problem} alt="Problem" />
      </div>
      <div className="faqbody">
        {FaqData.map((faq, i) => (
          <div key={i} style={{ margin: ".1em 0" }}>
            <Accordion expanded={expanded === i} onChange={handleChange(i)}>
              <AccordionSummary
                expandIcon={<MdKeyboardArrowDown />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>{faq.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.content}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
