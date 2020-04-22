import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "../actions/transactionActions"
import { bindActionCreators } from "redux";

class TransactionForm extends Component {

    state = {
        
        ...this.returnStateObject()
    }

    returnStateObject() {
        if (this.props.currentIndex == -1)
            return {
               
                amount: ''
            }
        else
            return this.props.list[this.props.currentIndex]
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex != this.props.currentIndex || prevProps.list.length != this.props.list.length) {
            this.setState({ ...this.returnStateObject() })
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
       if(this.state.amount=="")
       {
           alert("enter some task first")
           return
       }
      
         
        
       
        if (this.props.currentIndex == -1)
            this.props.insertTransaction(this.state)
        else
            this.props.updateTransaction(this.state)
        
           
    }
    handleasc = (e) => {
        e.preventDefault()
         const pp=this.props.list
        
         pp.sort(function(a, b){
            if(a.amount < b.amount) { return -1; }
            if(a.amount > b.amount) { return 1; }
            return 0;
        })
        console.log(pp)
     var k=pp.length
     var aa='';
     aa="    "+"index"+"         "+"Task"+"\n";
        for(var i=0;i<k;i++)
        {
          aa+="    "+i+"                 "+pp[i].amount+"\n";
        
        }
        alert(aa);
        
          
        
      
      
    }
    handledesc = (e) => {
        e.preventDefault()
         const pp=this.props.list
        
         pp.sort(function(a, b){
            if(a.amount < b.amount) { return 1; }
            if(a.amount > b.amount) { return -1; }
            return 0;
        })
        console.log(pp)
        var k=pp.length
        var aa='';
        aa="    "+"index"+"         "+"Task"+"\n";
        for(var i=0;i<k;i++)
        {
          aa+="    "+i+"                 "+pp[i].amount+"\n";
        
        }
        alert(aa);
       
      
      
          
       
      
      
    }

    render() {
        
        return (
<div style={{width:'600px',marginTop:'40px'}}>
            <div className={"input-group"} >
                <input type="text" className={"form-control"}  name="amount"  placeholder="Add task" onChange={this.handleInputChange} value={this.state.amount}  style={{boxShadow: '2px 2px 2px 2px #888888'}} />
                <span className={"input-group-btn"}>
                        <button className={"btn btn-info"} type="submit" onClick={this.handleSubmit} style={{marginLeft:'10px'}}>Add</button>
                </span>
              
             </div>  
            
             <span className={"input-group-btn"}  style={{marginLeft:'150px'}}>
  
     </span>
             </div>
        )
}
}
const mapStateToProps = state => {
    return {
        list: state.list,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        insertTransaction: actions.insert,
        updateTransaction: actions.update
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm)