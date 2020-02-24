/*import React,{Component}from "react";
import myimage from "../../assets/images/nice-piccy3.jpg";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../Session";
class TotalCount extends Component {
    constructor(props){
      super(props);
      this.state = {
          article: [],
          upvotes: [],
          downvotes: [],
          calculatedvote: 0,
          upvotecolor: 'gray',
          downvotecolor: 'gray',
          username: "",
          TotallComment: "",
          totalcount:0
      };
      
  }
 
  componentDidMount() {
      const { article } = this.props

      let upvotes = article.upvotes;
      let downvotes = article.downvotes;
      this.calculatedvote(upvotes, downvotes)
      let autherId = article.userId;
      this.unsubscribe = this.props.firebase
          .user(autherId)
          .get()
          .then(doc => {
             // console.log("userdata", doc.data())
              let user = doc.data()
              this.setState({ username: user.username })
          })
      //console.log("article", article);
      this.props.firebase
      .comments()
      .where("articleId", "==", article.uid)
      .onSnapshot(snapshot => {
        const TotallComment = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          TotallComment.push(data);
         

        });

        this.setState({ TotallComment: TotallComment });
        const totalcount = TotallComment.length
        this.setState({totalcount:totalcount})
      // console.log("this is  total count of the new component:" + totalcount)
      });
  }
  openPost(e, article) {
      //console.log("ARTICLE", article)
      e.preventDefault();
      this.props.history.push({
          pathname: "/articles/" + article.uid,
          params: article.uid,
          state: { article }
      });
  }
  componentDidUpdate = (prevProps) => {
      if (prevProps.article !== this.props.article) {
          this.calculatedvote(this.props.article.upvotes, this.props.article.downvotes)
      }
  };




  calculatedvote(upvotes, downvotes) {
      if (upvotes == 0) {
          upvotes = []
      }
      if (downvotes == 0) {
          downvotes = []
      }
      //console.log("upvote", upvotes)
      //console.log("downvote", downvotes)
      let upvotesTotal = upvotes.length;
      let downvotesTotal = downvotes.length;
      let finalTotal = upvotesTotal - downvotesTotal;
      // console.log("upvotestotal", upvotesTotal)
      //console.log("downvotestotal", downvotesTotal)
      this.setState({ calculatedvote: finalTotal })
  }
  handleUpvote = (authUser) => {
     // console.log("upvote")
      const { article } = this.props
      let initialvote = [authUser.uid];
      if (article.upvotes == 0) {
          if (this.checkDownvote(authUser.uid, article.downvotes) == -1) {
              this.setState({
                  downvotecolor: 'gray',
                  upvotecolor: 'darkred'
              })
              this.props.firebase
                  .article(article.uid)
                  .set({
                      ...article,
                      upvotes: initialvote,
                  })
              // console.log("upvotes", this.upvotes)
          }
          else {
              let uidIndex = this.checkDownvote(authUser.uid, article.downvotes)
              let articlearray = article.downvotes;
              articlearray.splice(uidIndex, 1)
              this.setState({
                  downvotecolor: 'gray',
                  upvotecolor: 'darkred'
              })
              this.props.firebase
                  .article(article.uid)
                  .set({
                      ...article,
                      upvotes: initialvote,
                      downvotes: articlearray
                  })
          }
      }
      else {
          if (this.checkUpvote(authUser.uid, article.upvotes) == -1) {
              if (this.checkDownvote(authUser.uid, article.downvotes) == -1) {

                 // console.log(this.checkUpvote)
                  this.setState({
                      calculatedvote: this.state.calculatedvote + 1,
                      upvotecolor: 'darkred',
                      downvotecolor: 'gray'
                  })
                  let upvotes = article.upvotes
                  let updatedUpvotes = upvotes
                  updatedUpvotes.push(authUser.uid)
                  this.props.firebase
                      .article(article.uid)
                      .set({
                          ...article,
                          upvotes: updatedUpvotes
                      })

              }

              else {
                  //console.log("checkDownvote")
                  let uidindex = this.checkDownvote(authUser.uid, article.downvotes)
                  let articlearray = article.downvotes;
                  this.setState({

                      downvotecolor: 'gray',
                      upvotecolor: 'darkred'
                  })
                  articlearray.splice(uidindex, 1)
                 // console.log("article.upvote", article.upvotes)
                  //let upvotesarray=article.upvotes.push(authUser.uid)
                  let upvotes = article.upvotes
                  let updatedUpvotes = upvotes
                  updatedUpvotes.push(authUser.uid)
                  this.props.firebase
                      .article(article.uid)
                      .set({
                          ...article,
                          downvotes: articlearray,
                          upvotes: updatedUpvotes
                      })
              }
          }
          else {
              console.log("already upvoted")
          }
      }
  }
  handleDownvote = (authUser) => {
      const { article } = this.props
      let initialvote = [authUser.uid];

      if (article.downvotes == 0) {
          //console.log("typeof", typeof (article.upvotes))
          if (this.checkUpvote(authUser.uid, article.upvotes) == -1) {
              this.setState({
                  downvotecolor: 'dodgerblue',
                  upvotecolor: 'gray'
              })
              this.props.firebase
                  .article(article.uid)
                  .set({
                      ...article,
                      downvotes: initialvote
                  })

          }
          else {
              let uidIndex = this.checkUpvote(authUser.uid, article.upvotes)
              let articlearray = article.upvotes;
              articlearray.splice(uidIndex, 1)
              this.setState({
                  downvotecolor: 'dodgerblue',
                  upvotecolor: 'gray'
              })
              this.props.firebase
                  .article(article.uid)
                  .set({
                      ...article,
                      downvotes: initialvote,
                      upvotes: articlearray
                  })
          }
      }
      else {
          //console.log("checkdownvote", this.checkDownvote(authUser.uid, article.downvotes));
          if (this.checkDownvote(authUser.uid, article.downvotes) == -1) {
              if (this.checkUpvote(authUser.uid, article.upvotes) == -1) {
                  this.setState({
                      calculatedvote: this.state.calculatedvote - 1,
                      downvotecolor: 'dodgerblue',
                      upvotecolor: 'gray'
                  })
                  let downvotes = article.downvotes
                  let updatedDownvotes = downvotes
                  updatedDownvotes.push(authUser.uid)
                  this.props.firebase
                      .article(article.uid)
                      .set({
                          ...article,
                          downvotes: updatedDownvotes
                      })

              }


              else {
                  //console.log("checkDownvote")
                  let uidindex = this.checkUpvote(authUser.uid, article.upvotes)
                  this.setState({
                      downvotecolor: 'dodgerblue',
                      upvotecolor: 'gray'
                  })
                //  console.log("uid", uidindex)
                  let articlearray = article.upvotes;
                  articlearray.splice(uidindex, 1)
                  //console.log("article.downvote", article.downvotes)
                  //let downvotearray=article.downvotes.push(authUser.uid)
                  let downvotes = article.downvotes
                  let updatedDownvotes = downvotes
                  updatedDownvotes.push(authUser.uid)
                  this.props.firebase
                      .article(article.uid)
                      .set({
                          ...article,
                          upvotes: articlearray,
                          downvotes: updatedDownvotes
                      })
              }
          }

          else {
              console.log("already upvoted")
          }
      }
  }

  checkUpvote = (uid, upvotes) => {
      console.log("filter", upvotes, uid)
      if (typeof (upvotes) == "number") {

          return -1

      }
      else {
          let filteredUpvote = upvotes.indexOf(uid)
          console.log("filteredvote", filteredUpvote)

          return filteredUpvote
      }
  }
  checkDownvote = (uid, downvotes) => {
      console.log("filter", downvotes, uid)
      console.log("typeof1", typeof (downvotes))
      if (typeof (downvotes) == "number") {

          return -1
      }
      else {
          let filteredDownvote = downvotes.indexOf(uid)

          console.log("filteredvote", filteredDownvote)


          return filteredDownvote
      }
  }

    
    render(){
      const { upvotes } = this.state
      const { downvotes } = this.state
      const { article } = this.props
   
        return(
          <AuthUserContext.Consumer>
       {authUser => (
       // <div>{this.props.children}</div>
       <div>
         
                            <div className="likes">



                                <span style={{
                                    fontSize: "1em",
                                marginRight:"auto",marginLeft:"auto"}}>
                                    <div className="upvote"

                                        onClick={() => this.handleUpvote(authUser)}
                                        onMouseOver={() => this.c}>
                                        <i className="fas fa-arrow-alt-up" style={{ color: this.state.upvotecolor }}> </i>
                                    </div>

                                    {this.state.calculatedvote}

                                    <div className="downvote"
                                        onClick={() => this.handleDownvote(authUser)}>

                                        <i className="fas fa-arrow-alt-down" style={{
                                            color: this.state.downvotecolor

                                        }}> </i>
                                    </div>
                                </span>
                            </div>
                            <div>
        
          {this.state.totalcount}
          </div>
          </div>
         )}
        </AuthUserContext.Consumer>
       // <div>{this.props.children}</div>
        )

    }

}
export default compose(withFirebase)(TotalCount)*/