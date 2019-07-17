import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    Items: [],
    value: "",
    count: 1
  };

  onAddItem = () => {
    let newItem = { id: this.state.count, name: this.state.value };
    let updatedItems = [...this.state.Items, newItem];
    let id = this.state.count + 1;
    this.setState({ Items: updatedItems, value: "", count: id });
  };

  onEdit = (OBJ, index) => {
    console.log(index);
    let idInputList = "input";
    idInputList = idInputList.concat(OBJ.id);

    //adding input for listItems
    let container = document.getElementById(idInputList);
    let input = document.createElement("input");
    input.type = "text";
    input.name = "listInput";
    input.id = "listInput";
    input.className = "listInput";
    input.value = OBJ.name;
    input.onchange = e => {
      this.onSave(e, index, OBJ.id);
    };
    container.appendChild(input);

    //hiding listItem
    let idList = "list";
    idList = idList.concat(OBJ.id);
    let list = document.getElementById(idList);
    list.className = "hide";
  };

  onSave = (data, index, id) => {
    let updatedItems = this.state.Items;
    let newItem = { id: id, name: data.target.value };
    updatedItems.splice(index, 1, newItem);
    console.log(updatedItems);
    this.setState({ Items: updatedItems });

    //displaying listItem
    let idList = "list";
    idList = idList.concat(id);
    let list = document.getElementById(idList);
    list.classList.remove("hide");

    //removing iput for lists
    let lstInput = document.getElementById("listInput");
    lstInput.parentNode.removeChild(lstInput);
  };

  onDelete = index => {
    let updatedItems = this.state.Items;
    updatedItems.splice(index, 1);
    console.log(updatedItems);
    this.setState({ Items: updatedItems });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <div>
          <input
            className="txtInput"
            name="listitem"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button className="btn" onClick={this.onAddItem}>
            Add
          </button>
        </div>

        <ul>
          {this.state.Items.map((OBJ, index) => {
            let idList = "list";
            idList = idList.concat(OBJ.id);
            let idInputList = "input";
            idInputList = idInputList.concat(OBJ.id);
            let idButton = "btn";
            idButton = idButton.concat(OBJ.id);
            return (
              <div className="item-view">
                <li id={idList}>
                  {OBJ.name}|{OBJ.id}
                </li>
                <div id={idInputList} />
                <button
                  id={idButton}
                  className="extra-btn"
                  onClick={() => this.onEdit(OBJ, index)}
                  onDoubleClick={() => this.onEdit(OBJ, index)}
                >
                  Edit
                </button>
                <button
                  className="extra-btn"
                  onClick={() => this.onDelete(index)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
