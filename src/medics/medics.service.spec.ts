import { Test, TestingModule } from '@nestjs/testing';
import { MedicsService } from './medics.service';

describe('MedicsService', () => {
  let service: MedicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicsService],
    }).compile();

    service = module.get<MedicsService>(MedicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
