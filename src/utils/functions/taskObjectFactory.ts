//isCompletePageがtrueなら完了タスクフォーム用のオブジェクトを返す
export const taskObjectFactory = (register, errors, task, isCompletePage) => {
  const common = {
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
    postContent: {
      placeholder: "投稿内容",
      type: "text",
      registerReturn: register("postContent"),
      errors: errors.postContent?.message,
      defaultValue: task?.postContent,
    },
  };

  if (isCompletePage) {
    return {
      ...common,
      understandingRate: {
        type: "number",
        registerReturn: register("understandingRate"),
        errors: errors.understandingRate?.message,
        defaultValue: task?.understandingRate,
      },
    };
  }
  return {
    ...common,
    dueDate: {
      type: "date",
      registerReturn: register("dueDate"),
      errors: errors.dueDate?.message,
      defaultValue: task?.dueDate,
    },
  };
};
