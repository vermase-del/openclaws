/**
 * Initial Student Hub domain contracts.
 * These JSDoc typedefs keep the current Vite/JavaScript setup usable while
 * making the migration path to TypeScript explicit.
 * @typedef {'beginner'|'intermediate'|'advanced'} CourseLevel
 * @typedef {{id:string,title:string,description:string,category:string,level:CourseLevel,instructorId:string,thumbnailUrl?:string,durationMinutes:number,published:boolean,tags:string[]}} Course
 * @typedef {{id:string,title:string,courseId?:string,instructorId:string,startsAt:string,endsAt:string,meetingUrl?:string,recordingUrl?:string,status:'scheduled'|'live'|'completed'|'cancelled'}} LiveClass
 * @typedef {{id:string,mentorId:string,startsAt:string,endsAt:string,timezone:string,status:'available'|'booked'|'blocked'}} MentorshipSlot
 * @typedef {{id:string,title:string,company:string,description:string,location:string,employmentType:'internship'|'full-time'|'part-time',applicationUrl?:string,deadline?:string,skills:string[],status:'open'|'closed'}} JobPosting
 * @typedef {{id:string,displayName:string,email:string,avatarUrl?:string,educationLevel?:string,institution?:string,skills:string[],interests:string[],roles:Array<'student'|'mentor'|'admin'>}} StudentProfile
 */
export {};
