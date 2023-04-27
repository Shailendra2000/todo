"use client";
import axiosInstance from "@/intercepters/defaultIntercepter";
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface";
import { getFormData } from "@/utils/getFormData";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";

interface ICreateStatusProps {
  statusList: ITaskStatus[];
}
const CreateStatus = (props: ICreateStatusProps) => {
  const defaultStatusFormFeilds = ["title"];
  const sucessMessage = "status created!";
  const errorMessage = "Bad Request";

  const createStatusMutation = useMutation(
    (params: { title: string }) =>
      axiosInstance
        .post("http://localhost:9000/task-status", params)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        alert(`${sucessMessage}`);
      },
      onError: (error) => {
        alert(`${errorMessage}`);
      },
    }
  );

  const createStatusAction = (
    formSubmitEvent: FormEvent<HTMLFormElement>,
    dataFeilds: string[] = defaultStatusFormFeilds
  ) => {
    const data = getFormData(formSubmitEvent.currentTarget, dataFeilds) as {
      title: string;
    };
    createStatusMutation.mutate(data);
  };

  return (
    <form
      className="flex gap-5 items-center justify-center rounded-lg bg-gray-200 px-10 py-5 shadow-lg"
      id="create"
      onSubmit={(e) => {
        e.preventDefault();
        createStatusAction(e);
      }}
    >
      <label htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          className="search-input"
          name="title"
          placeholder="status"
          required
        />
      </label>

      <button className="px-6 rounded border-none bg-sky-500 py-2 text-white hover:opacity-50">
        CREATE
      </button>
    </form>
  );
};
export default CreateStatus;
