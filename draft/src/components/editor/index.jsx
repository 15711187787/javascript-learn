import React from 'react';
import { Button } from 'antd';
import { Editor, EditorState, RichUtils } from 'draft-js';

class MyEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };
  render() {
    return (
      <React.Fragment>
        <Button type="primary">加粗</Button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }

  onChange = editorState => {
    this.setState({ editorState });
  };

  /**
   * 响应按钮: cmd+i, cmd+b
   */
  handleKeyCommand = (command, editorState) => {
    console.log(`[editor/handleKeyCommand] command: ${command}`);
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };
}

export default MyEditor;
