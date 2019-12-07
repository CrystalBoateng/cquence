import React, { Component } from 'react';
import './Add.css';

export class Add extends Component {
  constructor(props) {
    super(props);
    this.handleSequenceChange = this.handleSequenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateSequence = this.validateSequence.bind(this);
  }
  handleSequenceChange(e) {
    let sequence = e.target.value;
    this.validateSequence(sequence)
  }
  handleSubmit(e) {
    // allows button submission only if sequence is valid
    if (this.validateSequence(document.getElementById('sequence').value)) {
      let finalSequence = {
        sequenceName: document.getElementById('name').value,
        sequenceDescription: document.getElementById('description').value,
        sequence: document.getElementById('sequence').value.toUpperCase(),
      };
      this.props.onSubmit(finalSequence);
    } else {
      document.querySelector('#Add button').classList.add('shake');
    }
  }
  validateSequence(proposedString) {
    // displays a message if sequence contains non-'ACGT' letters
    for (let i = 0; i < proposedString.length; i++) {
      switch (proposedString[i].toUpperCase()) {
        case 'A':
          break;
        case 'C':
          break;
        case 'G':
          break;
        case 'T':
          break;
        default:
          if (document.querySelector('#sequence:invalid')) {
            document.getElementById('error-invalid-sequence')
              .classList.remove('hidden');
            return false;
          }
      }
    }
    // displays a message if sequence already uploaded
    for (let i = 0; i < this.props.loadedSequences.length; i++) {
      if (this.props.loadedSequences[i].sequence === proposedString.toUpperCase()) {
        let myel = document.getElementById('sequence');
        document.getElementById('error-duplicate-sequence').classList.remove('hidden');
        return false;
      }
    }
    return true;
  }
  render() {
    return (
      <main id="Add">
        <h1>Add a New Sequence</h1>
        <form>
          <label htmlFor="name">Sequence Name</label>
            <input
                   type="text"
                   autoFocus
                   id="name"
                   required placeholder="Example: MK178577.1" />
          <label htmlFor="description">Sequence Description</label>
            <input type="text" id="description" placeholder="Example: Synthetic construct plasmid pUB1392, complete sequence" />
          <label>Sequence
            <input
              id="sequence"
              onChange={this.handleSequenceChange}
              pattern="[ACGTacgt]+"
              placeholder="Example: ACTGGCCGAT"
              required
              title="Please use only the letters ACG and T." />
          </label>
        <div id={"error-duplicate-sequence"} className="form-error hidden">
          This sequence has already been uploaded to the database.
        </div>
        <div id={"error-invalid-sequence"} className="form-error hidden">
          Please use only the letters ACG and T.
        </div>
        </form>
          <button type={"submit"} onClick={this.handleSubmit}>Upload</button>
      </main>
    );
  }
}

export default Add;
