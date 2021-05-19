import React, { Component } from 'react';
import './Add.css';

export class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duplicateSeq: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
   validate(proposedString) {
   // reverts any previous error messages, button color, button shaking
     document.getElementById('error-missing-field').classList
       .add('hidden');
   document.getElementById('error-invalid-sequence').classList
     .add('hidden');
   document.getElementById('error-duplicate-sequence').classList
     .add('hidden');
   document.querySelector('#add button').classList
     .remove('deactivated-button');
    document.querySelector('#add button').classList
     .remove('shake');
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
           document.getElementById('error-invalid-sequence').classList
             .remove('hidden');
           document.querySelector('#add button').classList
             .add('deactivated-button');
           return false;
         }
     }
   }
    // displays a message if sequence already uploaded
    for (let i = 0; i < this.props.loadedSequences.length; i++) {
      if (
        // avoids triggering when the sequence is just an empty string
        (this.props.loadedSequences[i].sequence) &&
        (this.props.loadedSequences[i].sequence === proposedString.toUpperCase())
      ) {
        document.getElementById('error-duplicate-sequence').classList
          .remove('hidden');
        this.setState({
          duplicateSeq: this.props.loadedSequences[i].sequenceName
        });
        document.querySelector('#add button')
          .classList.add('deactivated-button');
        return false;
      }
    }
    // displays a message if any required fields are missing
    if (
      !(document.getElementById('name')).value ||
      !(document.getElementById('sequence')).value
    ) {
      document.getElementById('error-missing-field').classList
        .remove('hidden');
      document.querySelector('#add button').classList
        .add('deactivated-button');
      return false;
    }
    return true;
  }
  // Event Handlers
  handleChange(e) {
    let sequence = e.target.value;
    this.validate(sequence);
  }
  handleSubmit(e) {
    // allows button submission only if user input is valid
    if (this.validate(document.getElementById('sequence').value)) {
      let finalSequence = {
        sequenceName: document.getElementById('name').value,
        sequenceDescription: document.getElementById('description').value,
        sequence: document.getElementById('sequence').value.toUpperCase(),
      };
      // hides the submit button and shows the loading bar
      (document.querySelector("#add button")
        .setAttribute('style','display: none;'));
      (document.getElementById('loading-bar')
        .setAttribute('style','display: block;'));
      (document.querySelector("#loading-bar div")
        .setAttribute('style','display: block;'));
      // simulates waiting for a network response after POST request
      setTimeout( () => {
        this.props.onSubmit(finalSequence);
      }, 400);
    } else {
      // shakes the submit button
      document.querySelector('#add button').classList.add('shake');
    }
  }
  // Lifecycle Methods
  render() {
    return (
      <main id="add">
        <h1>Add a New Sequence</h1>
        <form action={'/sequences'}>
          <label htmlFor="name">Sequence Name: <span>*Required</span></label>
            <input type="text"
                   autoFocus
                   id="name"
                   placeholder="Example: MK178577.1"
                   required
            />
          <label htmlFor="description">Sequence Description: </label>
            <input type="text"
                   id="description"
                   placeholder="Example: Synthetic construct plasmid pUB1392, complete sequence"
            />
          <label>Sequence: <span>*Required</span>
            <input id="sequence"
                   onChange={this.handleChange}
                   pattern="[ACGTacgt]+"
                   placeholder="Example: ACTGGCCGAT"
                   required
                   title="Please use only the letters ACG and T."
            />
          </label>
          <div id={"loading-bar"}>
            <div></div>
          </div>
          <div id={"error-missing-field"} className="form-error hidden">
            Please enter all required fields.
          </div>
          <div id={"error-duplicate-sequence"} className="form-error hidden">
            This sequence has already been uploaded to the database as "{this.state.duplicateSeq}".
          </div>
          <div id={"error-invalid-sequence"} className="form-error hidden">
            Sequences may only include the letters ACG and T.
          </div>
        </form>
          <button type={"submit"} onClick={this.handleSubmit}>
            Add Sequence
          </button>
      </main>
    );
  }
}

export default Add;
