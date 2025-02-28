import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteThought } from '../scripts/api';

function IdeaTimelineItem ({thought, refreshData}) {
  const created_at = new Date(thought.created_at*1000)
  return (
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          {
            created_at.toLocaleDateString('en-US', {
            hour:"numeric", 
            minute: "numeric",})
          }
          <IconButton aria-label="delete" onClick={()=>{
            deleteThought(thought.thought_id)
            .then(() => {refreshData()})
          }}>
            <DeleteIcon />
          </IconButton>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {thought.content}
        </TimelineContent>
      </TimelineItem>
  )
}

export default function BasicTimeline({thoughts, refreshData}) {
  return (
    <Timeline>
      {thoughts.map(e => <IdeaTimelineItem thought={e} key={e.thought_id} refreshData={refreshData}/>)}
    </Timeline>
  );
}