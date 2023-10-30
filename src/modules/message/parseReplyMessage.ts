import { cleanMessage } from "@/modules/utils.js";

interface ReplyParentType {
  displayName: String;
  msgBody: String;
  msgId: String;
  userId: Number;
  userLogin: String;
}

interface ReplyThreadType {
  parentMsgId: String;
  parentUserLogin: String;
}

interface ReplyType extends ReplyParentType, ReplyThreadType {
  type: string
}

export type ReplyInfoType = ReplyType | object;

export const parseReplyMessage = (fields : any) : ReplyInfoType => {
  const isReply = Boolean(fields["reply-parent-user-id"]);
  if (!isReply) {
    return {};
  }

  const replyParent : ReplyParentType = {
    displayName: fields?.["reply-parent-display-name"],
    msgBody: cleanMessage(fields?.["reply-parent-msg-body"]),
    msgId: fields?.["reply-parent-msg-id"],
    userId: fields?.["reply-parent-user-id"],
    userLogin: fields?.["reply-parent-user-login"],
  };

  const replyThread : ReplyThreadType = {
    parentMsgId: fields?.["reply-thread-parent-msg-id"],
    parentUserLogin: fields?.["reply-thread-parent-user-login"]
  };

  return {
    type: "reply",
    ...replyParent,
    ...replyThread
  };
};
