import React, { Component } from "react";
import { render } from "react-dom";
import styled from "@emotion/styled";
import { injectGlobal } from "emotion";
import { parse } from "lucene";
import QueryAssist from "../../src";

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, sans-serif;
  }
`;

const Container = styled("div")`
  background: #282b37;
  width: 100vw;
  height: 100vh;
  padding: 20px;
`;

const Title = styled("h2")`
  color: #ffffff;
  margin-bottom: 15px;
  font-weight: 600;
`;

const Assist = styled(QueryAssist)`
  margin-bottom: 50px;
`;

const Footer = styled("div")`
  padding: 15px;
  text-align: center;
`;

export const Link = styled("a")`
  display: inline-block;
  background: #6554af;
  border: 1px solid #58499b;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 300;
  text-decoration: none;
  padding: 7px 15px;
  cursor: pointer;
`;

const data = [
  {
    name: "level",
    label: "级别",
    type: "string",
    enumerations: ["info", "error", "warn", "debug", "critical"],
  },
  {
    name: "http.method",
    type: "string",
    enumerations: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
  {
    name: "http_response.status",
    type: "int",
    enumerations: [200, 400, 404, 500],
  },
  {
    name: "heroku.dyno_id",
    type: "string",
    enumerations: null,
  },
  {
    name: "heroku.source",
    type: "string",
    enumerations: null,
  },
];

class Demo extends Component {
  render() {
    const inputProps = {
      bg: "#393B4A",
      border: "1px solid #1F1E21",
      borderRadius: "4px",
      color: "#9FA2B2",
      placeholderColor: "rgba(255, 255, 255, 0.2)",
      tokenColor: "#FFFFFF",
      fontSize: "16px",
      fontWeight: 300,
      fontFamily: "monospace",
      lineHeight: "20px",
      p: "15px 20px",
    };

    const dropdownProps = {
      bg: "#808498",
      borderRadius: "2px",
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "-apple-system, sans-serif",
    };

    const selectorProps = {
      bg: "#6554AF",
      border: "1px solid #58499B",
      color: "#FFFFFF",
    };

    const footer = () => (
      <Footer>
        <Link
          target="_blank"
          href="https://timber.io/docs/app/console/searching"
        >
          Learn more
        </Link>
      </Footer>
    );

    return (
      <Container>
        <Title>Basic Example</Title>
        <Assist
          placeholder="Search Logs ⌘ ⇧ F"
          onSubmit={(query) => {
            if (query) {
              console.log({
                kql: query,
                json: parse(query),
              });
            }
          }}
          data={data}
          inputProps={inputProps}
          dropdownProps={dropdownProps}
          selectorProps={selectorProps}
          footerComponent={footer}
        />

        <Title>Complex Query Example</Title>
        <Assist
          placeholder="Search Logs ⌘ ⇧ F"
          defaultValue={`keyword1 (level:error AND heroku.source:"foo bar") keyword2 http.method:POST\n\t(-level:info OR http_response.status:>=400)\nkeyword3 invalid:token heroku.dyno_id:abc*`}
          onSubmit={(query) => {
            if (query) {
              console.log({
                kql: query,
                json: parse(query),
              });
            }
          }}
          data={data}
          inputProps={inputProps}
          dropdownProps={dropdownProps}
          selectorProps={selectorProps}
          footerComponent={footer}
        />
        <div>{this.kql}</div>
        <pre>{this.json}</pre>
      </Container>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
