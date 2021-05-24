import React from 'react';


class Form extends React.Component {
  state = {
    title : "",
    memo : ""
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      title : "",
      memo : ""
    })
    window.location.reload();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="memo" style={{ display: "block", margin: "10px" }}>memo 작성!!</label>
          <textarea id="title" rows="1" cols="40" placeholder="제목" value={this.state.title} onChange={this.handleChange} style={{ display: "block" }}></textarea>
          <textarea id="memo" rows="10" cols="40" placeholder="내용" value={this.state.memo} onChange={this.handleChange} style={{ display: "block" }}></textarea>
          <button id="memo_input" type="submit" style={{ display: "block" }}>추가</button>
        </form>
      </div>
    )
  }
}

class Print extends React.Component {
  state = {
    update : 0
  }
  updateMemo = (e) => {
    const idx = this.state.idx

    let updateJson;
    if (this.state.title === undefined && this.state.memo === undefined) {
      updateJson = {
        title: this.props.title,
        memo: this.props.memo
      }
    }
    else if (this.state.title === undefined) {
      updateJson = {
        title: this.props.title,
        memo: this.state.memo
      }
    }
    else if (this.state.memo === undefined) {
      updateJson = {
        title: this.state.title,
        memo: this.props.memo
      }
    }
    else {
      updateJson = {
        title: this.state.title,
        memo: this.state.memo
      }
    }
    window.localStorage.setItem(idx, JSON.stringify(updateJson));
    this.setState({ update: 0 })
    window.location.reload();
  }

  deleteMemo = (e) => {
    for (let i = parseInt(e.target.value); i < localStorage.length-1; i++) {
      localStorage.setItem(i, localStorage.getItem(i+1));
    } 
    localStorage.removeItem(localStorage.length-1)
    window.location.reload();
  }

  handleUpdate = (e) => {
    this.setState({ update: 1, idx: e.target.value})
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    })
  }

  render() {
    if (this.state.update === 0) {
      return (
        <div>
          <p>{parseInt(this.props.keyL) + 1} 번째 메모</p>
          <p>제목 : {this.props.title}</p>
          <p>내용 : {this.props.memo}</p>
          <button id="memo_update" value={this.props.keyL} onClick={this.handleUpdate}>수정</button>
          <button id="memo_delete" value={this.props.keyL} onClick={this.deleteMemo}>삭제</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <form onSubmit={this.updateMemo}>
            <p>{parseInt(this.props.keyL) + 1} 번째 메모</p>
            <textarea id="title" rows="1" cols="40" placeholder="제목" onChange={this.handleChange} defaultValue={this.props.title} style={{ display: "block" }}></textarea>
            <textarea id="memo" rows="3" cols="40" placeholder="내용" onChange={this.handleChange} defaultValue={this.props.memo} style={{ display: "block" }}></textarea>
            <button id="memo_input" type="submit" style={{ display: "block" }}>수정 완료</button>
          </form>
        </div>
      )
    }
  }
}

let key;
class App extends React.Component {
  handleCreate = (data) => {
    console.log(JSON.stringify(data) + "저장 완료!");
    key = window.localStorage.length;
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  render() {
    return (
      <div>
        <Form
          onCreate={this.handleCreate}
        />
        {Object.keys(localStorage).sort().map((keyL) => {
          return <Print
            key={keyL}
            keyL={keyL}
            title={JSON.parse(localStorage.getItem(keyL, 'data')).title}
            memo={JSON.parse(localStorage.getItem(keyL, 'data')).memo}
          />
        })}

      </div>
    )
  }
}

export default App;