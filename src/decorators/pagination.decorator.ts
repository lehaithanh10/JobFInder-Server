import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { DEFAULT_PAGINATION } from "src/shared/model/type";

export const Pagination = createParamDecorator(
  (data: { pageSize: number }, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const page = request.query.page ? parseInt(request.query.page, 10) : 1;
    const pageSize = request.query.pageSize
      ? parseInt(request.query.pageSize, 10)
      : data?.pageSize || 50;
    return {
      ...DEFAULT_PAGINATION,
      page,
      pageSize,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    };
  }
);

export const PaginationSwaggerQuery = () => {
  return applyDecorators(
    ApiQuery({
      name: "page",
      type: Number,
      required: false,
    }),
    ApiQuery({
      name: "pageSize",
      type: Number,
      required: false,
    })
  );
};
