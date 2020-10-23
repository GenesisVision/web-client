import { compact, flatten } from "lodash";
import { NextScript } from "next/document";
import React from "react";

const filterChunkedScripts = props => !!props?.src?.includes("chunk");

const TIMEOUT = process.env.LOAD_TIMEOUT || 1800;

class NextScriptCustom extends NextScript {
  render() {
    const orgNextScripts = compact(flatten(super.render().props.children));

    const scripts = compact(
      orgNextScripts.map(child => {
        if (child.props.id === "__NEXT_DATA__") {
          return {
            props: child.props,
            content: child.props.dangerouslySetInnerHTML.__html
          };
        }

        if (child?.type === "script") {
          return {
            props: child.props,
            content: ""
          };
        }

        return null;
      })
    );

    const initialLoadScripts = scripts.filter(
      ({ props }) => !filterChunkedScripts(props)
    );
    const chunkedScripts = scripts.filter(({ props }) =>
      filterChunkedScripts(props)
    );

    const jsContent = `
      var chunkedScripts = ${JSON.stringify(chunkedScripts)};
      setTimeout(() => {
        chunkedScripts.forEach((script) => {
          if (!script || !script.props) return;
          try {
            var scriptTag = document.createElement('script');
  
            scriptTag.nomodule = script.props.nomodule;
            scriptTag.type = script.props.type;
            scriptTag.src = script.props.src;
            scriptTag.async = script.props.async;
            scriptTag.defer = script.props.defer;
            
            if (script.props.id) scriptTag.id = script.props.id;
            if (script.content) scriptTag.innerHTML = script.content;
            document.body.appendChild(scriptTag);
          }
          catch(err) {
            console.log(err);
          }
        });
      }, ${TIMEOUT});
    `;

    return (
      <>
        {initialLoadScripts.map(({ props }) => (
          <script key={props.id} {...props} />
        ))}

        <script
          id="__NEXT_SCRIPT_CUSTOM"
          defer
          dangerouslySetInnerHTML={{ __html: jsContent }}
        />
      </>
    );
  }
}

export default NextScriptCustom;
