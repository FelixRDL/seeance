import {Project, ProtoProject} from "../../entities/Project";
import {Course, ProtoCourse} from "../../entities/Course";
import {ProtoProjectToProjectMapper} from "./ProtoProjectToProjectMapper";
import {ProjectRepository} from "../ProjectRepository";
import {CourseRepository} from "../CourseRepository";

export class ProtoCourseToCourseMapper {
    private courseRepository: CourseRepository;
    private projectRepository: ProjectRepository;
    private projectMapper: ProtoProjectToProjectMapper;

    constructor(
        courseRepository: CourseRepository,
        projectRepository: ProjectRepository,
        projectMapper: ProtoProjectToProjectMapper) {
        this.courseRepository = courseRepository;
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    async map(
        proto: ProtoCourse,
    ): Promise<Course> {
        console.log("PROTO");
        console.log(proto);
        const projects: Project[] = await Promise.all(proto.projectIds.map((id) => {
            return this.projectRepository.getProjectById(id).then(
                protoProject => {
                    return this.projectMapper.map(protoProject);
                }
            )
        }));
        (proto as Course).projects = projects;
        return Promise.resolve(proto as Course);
    }
}