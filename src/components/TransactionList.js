import React, { Component } from 'react'
import TransactionForm from './TransactionForm'
import { connect } from "react-redux";
import * as actions from "../actions/transactionActions"
import { bindActionCreators } from "redux";
import  "./table.css";


class TransactionList extends Component {

    state= {
        sortTye:'asc'
    }
    handleEdit = (index) => {
        this.props.updateTransactionIndex(index)
    }

    handleDelete = (index) => {
        this.props.deleteTransaction(index)
    }
      onsortType = sortType => {
        
          this.setState({sortType})

      }

    render() {
        const {sortType} = this.state;
        const sorted = this.props.list.sort((a, b) => {
            const isReversed = (sortType==='asc') ? 1 : -1;
            const aName =a.amount.toString();
            const bName = b.amount.toString();
            return isReversed * aName.localeCompare(bName);
        })
        return (
            <div  >
            
            
                <TransactionForm />
                <button className={"btn btn-info"} type="submit" onClick={() => this.onsortType('asc')}  style={{marginLeft:'10px'}}>sort in Asc order{ "        "}{ "                                 :"}</button>
            <button className={"btn btn-info"} type="submit" onClick={() => this.onsortType('desc')}  style={{marginLeft:'360px'}}>sort in Desc order</button>
                <hr></hr>
                <div style={{ backgroundColor:'lightgreen'}}>
               <div>
               
                <marquee style={{ color: 'red', fontSize: '30px' }}>Tasks pending....</marquee> </div>
                 <table className="table" style={{display:'none'}}>
                    <tbody>
                    <tr className={"info"} > 
                    <th>Task</th>
                    <th  colspan="2">Actions</th> </tr>
                    
                    
                        {this.props.list.map((item, index) => {
                           
                            return <tr key={index}>
                               
                                <td>{item.amount}</td>
                                <td width="10%"><button className={"btn btn-info"}  onClick={() => this.handleEdit(index)}>Edit</button></td>
                                <td width="10%"><button className={"btn btn-info"} onClick={() => this.handleDelete(index)}>Delete</button></td>
                               
                               
                            </tr>
                            
                        })}
                    </tbody>
                </table>
                </div>
                <table className="table">
                    <tbody>
                    <tr className={"info"} > 
                    <th>Task</th>
                    <th  colspan="2">Actions</th> </tr>
                    
                    
                        {sorted.map((item, index) => {
                           
                            return <tr key={index}>
                               
                                <td>{item.amount}</td>
                                <td width="10%"><button className={"btn btn-info"}  onClick={() => this.handleEdit(index)}>Edit</button></td>
                                <td width="10%"><button className={"btn btn-info"} onClick={() => this.handleDelete(index)}>Delete</button></td>
                               
                               
                            </tr>
                            
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateTransactionIndex: actions.updateIndex,
        deleteTransaction: actions.Delete
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList)