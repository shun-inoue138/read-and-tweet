export const taskObjectFactory = (register, errors, task?) => {
  return {
    URL: {
      placeholder: "URLを入力してください",
      type: "text",
      registerReturn: register("url", {
        required: "URLは必須です",
      }),
      errors: errors.url?.message,
      defaultValue: task?.url,
    },
    title: {
      placeholder: "タイトルを入力してください",
      type: "text",
      registerReturn: register("title", {
        required: "タイトルは必須です",
      }),
      errors: errors.title?.message,
      defaultValue: task?.title,
    },
    randomNote: {
      placeholder: "ご自由にメモをどうぞ",
      registerReturn: register("randomNote"),
      errors: errors.randomNote?.message,
      defaultValue: task?.randomNote,
    },
    dueDate: {
      type: "date",
      registerReturn: register("dueDate"),
      errors: errors.dueDate?.message,
      defaultValue: task?.dueDate,
    },
    postContent: {
      placeholder: "投稿内容",
      type: "text",
      registerReturn: register("postContent"),
      errors: errors.postContent?.message,
      defaultValue: task?.postContent,
    },
  };
};
