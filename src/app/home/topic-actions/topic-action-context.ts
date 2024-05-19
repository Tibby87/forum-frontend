export type TopicActionContext = 'comment' | 'topic title' | 'topic body';

export interface TopicActionDialogBaseProps {
  context: TopicActionContext;
}
