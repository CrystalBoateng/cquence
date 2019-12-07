import React, { Component } from 'react';
export class Sequences extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expandedSeq: {
        sequenceName: '',
        sequenceDescription: '',
        sequence: 'ACGT',
      }
    };
    this.colorSequences = this.colorSequences.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleModal(sequence) {
    console.log('toggleModal() was called, and received this target.name:');
    console.log(sequence);
      // toggleDetailView isnt another component, just a modal window on top of this one. on click u must toggle : get id and display: block. OR display none.
  }
  colorSequences(el) {
    // colors the 'ACGT' text of any elements with the class 'colored'
    if (el.className && el.className.includes('colored')) {
      let uncoloredText = el.innerHTML;
      el.innerHTML = '';
      for (let i = 0; i < uncoloredText.length; i++) {
        // creates a span around each letter and appends that to the el
        let newSpan = document.createElement("span");
        newSpan.setAttribute("class","letter" + uncoloredText[i]);
        let textNode = document.createTextNode(uncoloredText[i]);
        newSpan.appendChild(textNode);
        el.appendChild(newSpan);
      }
    }
    // traverses the DOM recursively
    for (let i = 0; i < el.childNodes.length; i++)
      this.colorSequences(el.childNodes[i]);
  }
  // Event Handlers
  handleChange(e) {
    let q = e.target.value.toUpperCase();
    // unhides all sequences
    let el = document.getElementById('metadata-wrapper');
    for (let i = 0; i < el.childNodes.length; i++)
      el.childNodes[i].classList.remove('hidden');
    // if querystring, hides every non-matching sequence
    if (q) {
      let all = this.props.loadedSequences;
      let sequenceName;
      for (let i = 0; i < all.length; i++) {
        sequenceName = all[i].sequenceName.toUpperCase();
        if (sequenceName.startsWith(q) === false)
          document.getElementById(sequenceName).classList.add('hidden');
      }
    }
  }
  handleClick(e) {
    console.log('~');
		switch (e.target.name) {
			case 'sequenceName':
				this.props.onReorder(e.target.name);
				break;
			case 'sequenceDescription':
				this.props.onReorder(e.target.name);
				break;
			case 'sequence':
				this.props.onReorder(e.target.name);
				break;
      default:
        console.log(e.target.id);
        // this.toggleModal(e.target.id)
		}
  }
  // Lifecycle Methods
  componentDidUpdate() {
    this.colorSequences(document.getElementById('modal'));
  }
  render() {
    return(
      <main id="sequences">
        <h1>Sequences</h1>
        <div id="search-wrapper">
          <label htmlFor="query">Search:</label>
            <input type="search" onChange={this.handleChange} name="query" autoFocus placeholder="Search..." />
        </div>
        <div id="sort-wrapper">
          <p>Sort by...</p>
          <button 
            onClick={this.handleClick}
            name="sequenceName" >Name</button>
          <button 
            onClick={this.handleClick}
            name="sequenceDescription" >Description</button>
          <button 
            onClick={this.handleClick}
            name="sequence" >Sequence</button>
        </div>
        <div id="modal">
          <div>
            I'm the modal window.
            <h2>{this.state.expandedSeq.sequenceName}</h2>
            <p>{this.state.expandedSeq.sequenceDescription}</p>
            <p className="colored">{this.state.expandedSeq.sequence}</p>
          </div>
        </div>
        <div id="metadata-wrapper">
          {this.props.loadedSequences.map((instance, index) => {
            return (
              <div
                className="metadata" 
                id={instance.sequenceName} 
                key={index} >
                <h2
                  onClick={this.handleClick}
                  id={instance.sequenceName} >
                  {instance.sequenceName}
                </h2>
                <p
                  onClick={this.handleClick}
                  id={instance.sequenceName} >
                  {instance.sequenceDescription}
                </p>
                <p
                  onClick={this.handleClick}
                  id={instance.sequenceName} >
                  {instance.sequence}
                </p>
              </div >
            )
          })}
        </div>
      </main>
    )
  }
}

export default Sequences;