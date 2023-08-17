import { Test, TestingModule } from '@nestjs/testing';
import { PermissionAssignLogService } from './permission_assign_log.service';

describe('PermissionAssignLogService', () => {
  let service: PermissionAssignLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionAssignLogService],
    }).compile();

    service = module.get<PermissionAssignLogService>(PermissionAssignLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
