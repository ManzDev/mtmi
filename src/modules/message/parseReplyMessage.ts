import { cleanMessage } from "@/modules/utils.js";

export interface ReplyParentType {
  displayName: String;
  msgBody: String;
  msgId: String;
  userId: Number;
  userLogin: String;
}

export interface ReplyThreadType {
  parentMsgId: String;
  parentUserLogin: String;
}

type ReplyMessage = (ReplyParentType & ReplyThreadType) | null;

export const parseReplyMessage = (fields) : ReplyMessage => {
  const isReply = Boolean(fields["reply-parent-user-id"]);
  if (!isReply) {
    return null;
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
    ...replyParent,
    ...replyThread
  };
};
