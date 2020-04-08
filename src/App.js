import React from "react";
import NavBar from "./components/navbar";
import { Component } from "react";
import "./App.css";
import Translate from "./components/translate";
import InputField from "./components/inputField";
import DisplayField from "./components/displayField";
import axios from "axios";

// Declaring Constants
const TRANSLATOR_TEXT_ENDPOINT =
  "https://api.cognitive.microsofttranslator.com/";
const TRANSLATOR_TEXT_SUBSCRIPTION_KEY = "46d0031c64964a078c66c23a5a59838a";

class App extends Component {
  state = {
    translation: {
      toLang: "",
      fromLang: "",
      toText: "",
      fromText: "",
      supportedLanguage: []
    }
  };

  // Component LifeCycle Hook

  async componentDidMount() {
    // Creating request option
    const headers = {
      "Ocp-Apim-Subscription-Key": TRANSLATOR_TEXT_SUBSCRIPTION_KEY,
      "Content-type": "application/json"
    };

    const options = {
      method: "get",
      baseURL: TRANSLATOR_TEXT_ENDPOINT,
      url: "/languages",
      params: {
        "api-version": "3.0",
        scope: "translation"
      },
      headers: headers,
      json: true
    };

    // Get Request to get the supported languages

    const response = await axios(options);
    const data = response.data.translation;
    const languageCode = Object.keys(data);
    const languages = languageCode.map(lCode => ({
      code: lCode,
      language: data[lCode].name
    }));
    const translation = { ...this.state.translation };
    translation.supportedLanguage = languages;
    this.setState({ translation });
  }

  // Event Handler to handle text change in input field
  handleTextChange = event => {
    const translation = { ...this.state.translation };
    translation.fromText = event.currentTarget.value;
    this.setState({ translation });
  };

  // Event Handler to get the translated text
  handleTranslate = async event => {
    const headers = {
      "Ocp-Apim-Subscription-Key": TRANSLATOR_TEXT_SUBSCRIPTION_KEY,
      "Content-type": "application/json"
    };

    const options = {
      method: "post",
      baseURL: TRANSLATOR_TEXT_ENDPOINT,
      url: "/translate",
      params: {
        "api-version": "3.0",
        to: "de"
      },
      data: [
        {
          text: this.state.translation.fromText
        }
      ],
      headers: headers,
      json: true
    };

    // post request to get the translated response
    const response = await axios(options);
    const translateData = response.data[0];
    const translation = { ...this.state.translation };
    translation.toText = translateData.translations[0].text;

    translation.fromLang = translation.supportedLanguage.find(
      element => element.code === translateData.detectedLanguage.language
    ).language;
    translation.toLang = translation.supportedLanguage.find(
      element => element.code === translateData.translations[0].to.toString()
    ).language;

    this.setState({ translation });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main role="main">
          <div className="container-fluid m-0 p-2 bg-light border">
            <div className="row">
              <div className="col-2">
                <button type="button" className="btn btn-dark btn-lg">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i className="fa fa-language" aria-hidden="true"></i>
                    <span style={{ marginLeft: "10px" }}>Text</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="container-fluid m-2 p-2 bg-white">
            <div className="row align-items-center">
              <div className="col-5"></div>
              <div className="col-1">
                <Translate
                  onTranslate={
                    this.state.translation.fromText !== "" &&
                    this.handleTranslate
                  }
                />
              </div>
              <div className="col-5"></div>
            </div>
            <div className="row align-items-center">
              <div className="col-5">
                <InputField
                  inputText={this.state.translation.fromText}
                  inputLanguage={this.state.translation.fromLang}
                  onTextChange={this.handleTextChange}
                />
              </div>
              <div className="col-1"></div>
              <div className="col-5">
                <DisplayField
                  translatedText={this.state.translation.toText}
                  translatedLanguage={this.state.translation.toLang}
                />
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
