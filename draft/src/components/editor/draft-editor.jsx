import React from 'react';
import Immutable from 'immutable';
import { Button } from 'antd';
import { Editor, EditorState, RichUtils } from 'draft-js';

const blockRenderMap = Immutable.Map({
  'header-two': {
    element: 'h3',
  },
  unstyled: {
    element: 'h3',
  },
});

class RichEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };
  render() {
    return (
      <React.Fragment>
        <Button.Group>
          <Button onClick={this.handleKeyBold}>加粗</Button>
          <Button onClick={this.handleKeyItalic}>斜体</Button>
        </Button.Group>
        <Editor
          blockRenderMap={blockRenderMap}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          placeholder="请在下方输入内容"
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

  /**
   * 点击加粗
   */
  handleKeyBold = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState), 'BOLD');
    return 'handled';
  };

  /**
   * 点击斜体
   */
  handleKeyItalic = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState),
      'ITALIC'
    );
    return 'handled';
  };
}

export default RichEditor;
