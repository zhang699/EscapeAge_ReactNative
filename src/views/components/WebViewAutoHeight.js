/*
        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2016 Esa-Matti Suuronen <esa-matti@suuronen.org>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
*/

import React from 'react';
import {WebView, View, Text} from "react-native";


const BODY_TAG_PATTERN = /\<\/ *body\>/;

// Do not add any comments to this! It will break because all line breaks will removed for
// some weird reason when this script is injected.
var script = `
;(function() {
var wrapper = document.createElement("div");
wrapper.id = "height-wrapper";
while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
}

document.body.appendChild(wrapper);

var i = 0;
function updateHeight() {
    document.title = wrapper.clientHeight;
    window.location.hash = ++i;
}
updateHeight();

window.addEventListener("load", function() {
    updateHeight();
    setTimeout(updateHeight, 1000);
});

window.addEventListener("resize", updateHeight);
}());
`;


const style = (css)=>{return `
<style>
body, html, #height-wrapper {
    margin: 0;
    padding: 0;
}
#height-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
${css}
</style>
<script>
${script}
</script>
`};




/**
 * Wrapped Webview which automatically sets the height according to the
 * content. Scrolling is always disabled. Required when the Webview is embedded
 * into a ScrollView with other components.
 *
 * Inspired by this SO answer http://stackoverflow.com/a/33012545
 * */
var WebViewAutoHeight = React.createClass({

    propTypes: {
        source: React.PropTypes.object.isRequired,
        injectedJavaScript: React.PropTypes.string,
        minHeight: React.PropTypes.number,
        onNavigationStateChange: React.PropTypes.func,
        style: WebView.propTypes.style,
    },

    getDefaultProps() {
        return {minHeight: 100, color:'black'};
    },

    codeInject(html){
      const {color, backgroundColor} = this.props.contentCSS || {color:'black', backgroundColor:'white'};
      const css = `body {color:${color}; background-color:${backgroundColor};}`;
      return html.replace(BODY_TAG_PATTERN, style(css) + "</body>");
    },
    
    getInitialState() {
        return {
            realContentHeight: this.props.minHeight,
        };
    },

    handleNavigationChange(navState) {
        if (navState.title) {
            const realContentHeight = parseInt(navState.title, 10) || 0; // turn NaN to 0
            this.setState({realContentHeight});
        }
        if (typeof this.props.onNavigationStateChange === "function") {
            this.props.onNavigationStateChange(navState);
        }
    },

    render() {
        const {source, style, minHeight, scrollEnabled=false, ...otherProps} = this.props;
        const html = source.html;

        if (!html) {
            throw new Error("WebViewAutoHeight supports only source.html");
        }

        if (!BODY_TAG_PATTERN.test(html)) {
            throw new Error("Cannot find </body> from: " + html);
        }

        return (
            <View>
                <WebView
                    {...otherProps}
                    source={{html: this.codeInject(html)}}
                    scrollEnabled={scrollEnabled}
                    style={[style, !scrollEnabled && {height: Math.max(this.state.realContentHeight, minHeight)}]}
                    javaScriptEnabled
                    onNavigationStateChange={this.handleNavigationChange}
                />
                {process.env.NODE_ENV !== "production" &&
                <Text>Web content height: {this.state.realContentHeight}</Text>}
            </View>
        );
    },

});


export default WebViewAutoHeight;
