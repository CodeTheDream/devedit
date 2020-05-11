import React from "react";
// import OpenClose from "../OpenClose";
import SearchBar from '../SearchBar';
// import '../../../src/'
import SideBarCloseButton from '../SideBarCloseButton';


const SideBarOpen = props => {
  let sideBarMenu = props.projectData;
  let probableList = sideBarMenu.filter(filterProjectList =>
    filterProjectList.fields.Status !== 'Probable'
    );

    let filteredList = probableList.filter(project => 
      project.fields.Status !== 'Paused')
    
  console.log('sideBarMenu ', sideBarMenu)
  console.log('probableList ', probableList)
  console.log('filteredList ', filteredList)
    return (
      <div className="sidebar-menu">
        <div className="btn-home">
          {/* <OpenClose /> */}       {/* I don't need at this time or if at all */}
          <div className = 'search-container'>
                <SearchBar
                  projectData={props.projectData}
                  selectProject={props.selectProject}
                  handleInput={props.handleInput}
                />
              <SideBarCloseButton handleCloseClick = {props.handleCloseClick}/>
            </div>
              
            
        </div>
        <div className = 'menu-container'>
        {filteredList.map(sideBar => (
          <li
            // style={{backgroundColor: '#fae596'}}
            key={sideBar.fields.Name}
            onClick={() => props.selectProject(sideBar.id)}
            className="menu">
            {sideBar.fields.Name}
          </li>
        ))}
        </div>
      </div>
    );

    
};


  // console.log("check for today's ", sideBarMenu);

export default SideBarOpen;
