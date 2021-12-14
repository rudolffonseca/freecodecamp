class NavEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <nav className="navmenu">
        <span>
          ( <i class="fas fa-file-alt"></i> )&nbsp;
          {this.props.name}
        </span>
        {this.props.children}
      </nav>
    );
  }
}

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      editorWindow: "block",
      editorHeight: "auto",
      viewerWindow: "block",
      viewerHeight: "auto",
      input: globalText
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeEditor = this.handleChangeEditor.bind(this);
    this.handleChangeViewer = this.handleChangeViewer.bind(this);
    this.changeState = this.changeState.bind(this)
  }
  
  handleInputChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  
  handleChangeEditor() {
    this.changeState('editorWindow', "block", "none");
    this.changeState('viewerHeight', "auto", "100vh");
  }
  
  handleChangeViewer() {
    this.changeState("viewerWindow", "block", "none");
    this.changeState("editorHeight", "auto", "100vh;");
  }
  
  changeState(e, state1, state2) {
    if (this.state[e] == state1) {
      this.setState(state => ({
        [e]: state2
      }));
    } else {
      this.setState(state => ({
        [e]: state1
      }))
    }
  }
    
  render() {
    return (
      <div id="main">
        <div className="editorSize" Style={'display: ' + this.state.editorWindow}>
        <NavEditor name="Editor">
          <button className="fas fa-expand-alt" onClick={this.handleChangeViewer}/>
        </NavEditor>
        <textarea readonly={this.props.readOnly} 
          id="editor"
          Style={"min-height: 40vh; height:" + this.state.editorHeight}
          value={this.state.input}
          onChange={this.handleInputChange} />
      </div>
   
      <div className="previewerSize" Style={'display: ' + this.state.viewerWindow}>
        <NavEditor name="Previewer">
          <button className="fas fa-expand-alt" onClick={this.handleChangeViewer}/>
        </NavEditor>
        <div  id="preview" 
              Style={"background-color: white; min-height: 30vh; resize: none; height: " + this.state.viewerHeight}
              dangerouslySetInnerHTML={{__html: marked.parse(this.state.input)}}>
        </div>
      </div>
    </div>
    );
  }
}

var globalText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

ReactDOM.render(
  <App />,
  document.getElementById("app")
);

