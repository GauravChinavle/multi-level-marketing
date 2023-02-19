import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash"
// const _ = require("lodash")
import "./Tree.css"

export default function Tree() {

  const [allMembers, setAllMembers] = useState([]);
  const [tree, setTree] = useState({});

  const navigate = useNavigate();
  function handleClick(path: string) {    
    navigate(`/${path}`);
  }

  useEffect(() => {
    getAllMembers();
  }, [])
  useEffect(() => {
    buildTree();
  }, [allMembers])


  const getAllMembers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/members/getAll`);
      setAllMembers(data.data);

    } catch (error) {
      console.error("Error occured while getting members list", error);
    }
  }

  const buildTree = () => {
    let root;
    
    allMembers?.forEach((el: any) => {
      // Handle the root element
      if (el.parentId === 0) {
        root = el;
        return;
      }
      // Use our mapping to locate the parent element in our data array
      
      const parentEl: any = allMembers[idMapping[el.parentId]];
      // Add our current el to its parent's `children` array
      parentEl.children = [...(parentEl.children || []), el];
    });
    if (root) {
      const treeArray: any = [];
      treeArray.push(root);
      setTree([...treeArray] || []);
    }
  }

  const idMapping = allMembers.reduce((acc: any, el: any, i: number) => {    
    acc[el.id] = i;
    return acc;
  }, {});

  const makeTree = (o: any) =>
    `<ul>${o?.map((obj: any) =>
      obj.children ?
        `<li title="${obj.email}"><a href="#">${obj.firstName}</a>${makeTree(obj.children)}</li>`
        :
        `<li title="${obj.email}"><a href="#">${obj.firstName}</a></li>`
    ).join("")}</ul>`


  setTimeout(() => {
    let myContainer: HTMLDivElement | null = document.querySelector("#tree");
    if (myContainer instanceof HTMLDivElement && tree && !_.isEmpty(tree)) {
      const htmlTree = makeTree(tree);
      myContainer.innerHTML = htmlTree;
    }
  }, 100)

  return (
    <>
      <div className="tree" id="tree">
      </div>
      <p>
        <Button onClick={()=>handleClick("registration")}>Add User</Button>
        <Button onClick={()=>handleClick("users")}>Show Users</Button>
      </p>
      <p>
      </p>

    </>
  );
}

