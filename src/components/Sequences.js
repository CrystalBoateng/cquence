import React, { Component } from 'react';
export class Sequences extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expandedSeq: {
        sequenceName: '',
        sequenceDescription: '',
        sequence: ''
      }
    };
    this.colorSequences = this.colorSequences.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  showModal(sequence) {
    document.getElementById("modal")
      .classList.remove('hidden');
    for (let i = 0; i < this.props.loadedSequences.length; i++) {
      let currentSeq = this.props.loadedSequences[i];
      if (currentSeq.sequenceName === sequence) {
        this.setState( {expandedSeq: {
          sequenceName: currentSeq.sequenceName,
            sequenceDescription: currentSeq.sequenceDescription,
            sequence: currentSeq.sequence
        }});
      }
    }
  }
  colorSequences(el) {
    // colors the 'ACGT' text of any elements with the class 'colored'
    if (el.className && el.className.includes('colored')) {
      console.log()
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
      case 'closeModal':
        document.getElementById("modal")
          .classList.add('hidden');
        break;
      case 'modal':
        document.getElementById("modal")
          .classList.add('hidden');
        break;
			case 'sequenceDescription':
				this.props.onReorder(e.target.name);
				break;
			case 'sequenceName':
				this.props.onReorder(e.target.name);
				break;
			case 'sequence':
				this.props.onReorder(e.target.name);
				break;
      default:
        this.showModal(e.target.id)
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
        <section>
          <h2>Sorting and Filtering</h2>
            <label htmlFor="query">Search:</label>
              <input type="search"
                     onChange={this.handleChange}
                     name="query"
                     autoFocus
                     placeholder="Search..." />
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
        </section>
        <section id="modal" onClick={this.handleClick} className="hidden">
          <h2>Detail View</h2>
          <div>
            <button
              onClick={this.handleClick}
              name="closeModal" >X</button>
            <h2>{this.state.expandedSeq.sequenceName}</h2>
            <h3>{this.state.expandedSeq.sequenceDescription}</h3>
            <br />
            <p className="colored">{this.state.expandedSeq.sequence}</p>
          </div>
        </section>
        <section id="metadata-wrapper">
          <h2>Sequence List</h2>
          {this.props.loadedSequences.map((instance, index) => {
            return (
              <div
                className="metadata" 
                id={instance.sequenceName} 
                key={index} >
                <h3
                  onClick={this.handleClick}
                  id={instance.sequenceName} >
                  {instance.sequenceName}
                </h3>
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
        </section>
      </main>
    )
  }
}

export default Sequences;