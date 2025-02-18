// import { Audit } from "../class/audit";

// export abstract class GenericMapper {
//   static toEntity<Entity extends Audit>(
//     dto: Partial<Entity>,
//     targetEntity: Entity,
//     currentDate: Date,
//   ): Entity {
//     const entity = Object.assign(targetEntity, dto);

//     if (!targetEntity._id) {
//       entity.createdAt = currentDate;
//     } else {
//       entity.updatedAt = currentDate;
//     }

//     return entity;
//   }
// }
