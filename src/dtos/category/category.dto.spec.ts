import { validate } from "class-validator";
import { CategoryDTO } from "./category.dto";

describe("CategoryDTO", () => {
  it("should validate with valid name", async () => {
    const dto = new CategoryDTO();
    dto.name = "ValidName";

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it("should not validate with invalid name", async () => {
    const dto = new CategoryDTO();
    dto.name = "TooLongNameExceedsLimit";

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it("should validate with optional name", async () => {
    const dto = new CategoryDTO();

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });
});
