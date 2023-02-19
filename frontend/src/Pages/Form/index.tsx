import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Input, Dropdown } from "../../utils/components";
import { inputList } from "../../config/inputList";
import { useEffect, useState } from "react";
import { memberSchema } from "../../config/validation/member";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Snackbars } from "../../utils/components";

import axios from "axios";

const Joi = require('joi-browser');


function Form(props: any) {
  const { handleSubmit, control, reset } = useForm();
  const [errors, setErrors] = useState({});
  const [allMembers, setAllMembers] = useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams()
  const [actionFlag, setActionFlag] = useState("Add")
  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllMembers();
    const id: string | null = searchParams.get("id")
    if (id) {
      getMember(id);
      setActionFlag("Edit")
    }
  }, [])

  const getMember = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/members/get/${id}`);
      reset(data.data);
    } catch (error) {
      console.error("Error occured while getting members list", error);
    }
  }

  const getAllMembers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/members/getAll`);
      setAllMembers(data.data);

    } catch (error) {
      console.error("Error occured while getting members list", error);
    }
  }

  const onSubmit = async (memberData: any) => {
    const errorMessage = validateForm(memberData);
    console.log({ memberData, errorMessage });
    if (!errorMessage) {
      try {
        let success;
        let id = memberData.parentId;
        let level = 0;

        while (id || id == 0) {
          const index = allMembers.findIndex((obj: any) => obj.id == id);
          if (index > -1) {
            id = allMembers[index].parentId;
            level++
          } else {
            id = null;
          }
        }

        memberData.level = level;

        if (actionFlag === "Add") {
          const { data } = await axios.post(`http://localhost:3001/members/add`, memberData);
          success = data.success;
        }
        if (actionFlag === "Edit") {
          const { data } = await axios.put(`http://localhost:3001/members/update/${memberData.id}`,memberData);
          success = data.success;
        }
        if (success) {
          setOpen(true);
          setSeverity("success");
          navigate("/");
        }
      } catch (error) {
        console.error("Error occured", error);
      }

    }
  }


  const validateForm = (data: any) => {
    const result = Joi.validate(data,
      memberSchema, { abortEarly: false });
    const { error } = result;
    if (!error) {
      setErrors({});
      return null;
    } else {
      const errorData: any = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      setErrors(errorData);
      return errorData;
    }
  };

  return (

    <>
      <form>
        {
          inputList.map((obj: any, index: number) => {
            const { name, label, type } = obj;
            return (
              <div key={index}>
                <Input control={control} name={name} label={label} type={type} error={errors[name as keyof typeof errors]} /> <br />
              </div>
            )
          })
        }
        <Dropdown control={control} name={"parentId"} label={"Parent"} error={errors["parentId" as keyof typeof errors]} allMembers={allMembers} />
        <p />

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </form>
      <Snackbars severity={severity} open={open} setOpen={setOpen}/>
    </>
  );
};


export default Form;