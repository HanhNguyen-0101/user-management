import { Test, TestingModule } from '@nestjs/testing';
import { PermissionAssignLogController } from './permission_assign_log.controller';
import { PermissionAssignLogService } from './permission_assign_log.service';

describe('PermissionAssignLogController', () => {
  let controller: PermissionAssignLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionAssignLogController],
      providers: [PermissionAssignLogService],
    }).compile();

    controller = module.get<PermissionAssignLogController>(PermissionAssignLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
