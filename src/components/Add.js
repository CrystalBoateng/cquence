import React, { Component } from 'react';
import './Add.css';
export class Add extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSequenceChange = this.handleSequenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(e) {
    let name = e.target.value;
    this.props.onNameChange(name)
  }
  handleSequenceChange(e) {
    let sequence = e.target.value;
    this.props.onSequenceChange(sequence)
  }
  handleSubmit(e) {
    let finalSequence = {
      sequenceName: document.getElementById('name').value,
      sequenceDescription: document.getElementById('description').value,
      sequence: document.getElementById('sequence').value,
    };
    console.log(finalSequence);
    this.props.onSubmit(finalSequence);
  }
  render() {
    return (
      <main id="Add">
      <h4> blah new</h4>
        <h1>Add DNA Sequence</h1>
        <form>
          <label htmlFor="name">Sequence Name</label>
            <input type="text" onChange={this.handleNameChange} id="name" autoFocus required placeholder="Example: MK178577.1" />
          <label htmlFor="description">Sequence Description</label>
            <input type="text" id="description" placeholder="Example: Synthetic construct plasmid pUB1392, complete sequence" />
          <label>Sequence
            <textarea onChange={this.handleSequenceChange} id="sequence" required placeholder="Example: ACTGGCCGAT"></textarea>
          </label>
        </form>
          <button type={"submit"} onClick={this.handleSubmit}>Upload</button>
      </main>
    );
  }
}

export default Add;
