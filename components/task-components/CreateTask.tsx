"use client";
import { useMutation } from "@tanstack/react-query";
import { useTaskStatusList } from "@/hooks/task-status-list-hooks/useTaskStatusList";
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface";
import { FormEvent } from "react";
import { getFormData } from "@/utils/getFormData";
import axiosInstance from "axios";

interface ICreateTaskProps {
  buttonDisabled: boolean;
}

interface ITaskCreateData {
  title: string;
  desc: string;
  status: string;
}

const CreateTask = (props: ICreateTaskProps) => {
  const { statusList } = useTaskStatusList();
  const defaultTaskFormFeilds = ["title", "desc", "status"];
  const defaultSucessMessage = "task created!";
  const defaultErrorMessage = "Bad Request!";

  const createTaskMutation = useMutation(
    (params: ITaskCreateData) =>
      axiosInstance.post("http://localhost:9000/task", params).then((res) => res.data),
    {
      onSuccess: (data) => {
        console.log(`${defaultSucessMessage}`);
      },
      onError: (error) => {
        console.log(`${defaultErrorMessage}`);
      },
    }
  );

  const createTaskAction = (
    formSubmitEvent: FormEvent<HTMLFormElement>,
    dataFeilds: string[] = defaultTaskFormFeilds
  ) => {
    const data = getFormData(
      formSubmitEvent.currentTarget,
      dataFeilds
    ) as unknown as ITaskCreateData;
    createTaskMutation.mutate(data);
  };

  return (
    <form
      className="flex gap-5 items-center justify-center rounded-lg bg-gray-200 px-10 py-5 shadow-lg"
      onSubmit={(e) => {
        e.preventDefault();
        createTaskAction(e);
      }}
    >
      <label htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          className="search-input"
          name="title"
          placeholder="task title"
          required
        />
      </label>

      <label htmlFor="desc">
        Description
        <input
          type="text"
          id="desc"
          className="search-input"
          name="desc"
          placeholder="task desc"
          required
        />
      </label>
      <label htmlFor="status">
        Status
        <select className="search-input" name="status">
          {statusList.map((status: ITaskStatus) => (
            <option value={status.id} key={status.status}>
              {status.status}
            </option>
          ))}
        </select>
      </label>
      <button
        disabled={props.buttonDisabled}
        className="px-6 disabled:bg-gray-300 rounded border-none bg-sky-500 py-2 text-white hover:opacity-50"
      >
        CREATE
      </button>
    </form>
  );
};
export default CreateTask;
