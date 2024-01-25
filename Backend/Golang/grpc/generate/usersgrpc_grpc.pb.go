// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v4.25.1
// source: usersgrpc.proto

package protogrpc

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	UsersService_GetUsers_FullMethodName    = "/protogrpc.UsersService/GetUsers"
	UsersService_GetOneUsers_FullMethodName = "/protogrpc.UsersService/GetOneUsers"
	UsersService_PutOneUsers_FullMethodName = "/protogrpc.UsersService/PutOneUsers"
)

// UsersServiceClient is the client API for UsersService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type UsersServiceClient interface {
	GetUsers(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*ResponseUsers, error)
	GetOneUsers(ctx context.Context, in *IdUsers, opts ...grpc.CallOption) (*ResponseOneUser, error)
	PutOneUsers(ctx context.Context, in *IdUsers, opts ...grpc.CallOption) (*ResponseOneUser, error)
}

type usersServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewUsersServiceClient(cc grpc.ClientConnInterface) UsersServiceClient {
	return &usersServiceClient{cc}
}

func (c *usersServiceClient) GetUsers(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*ResponseUsers, error) {
	out := new(ResponseUsers)
	err := c.cc.Invoke(ctx, UsersService_GetUsers_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersServiceClient) GetOneUsers(ctx context.Context, in *IdUsers, opts ...grpc.CallOption) (*ResponseOneUser, error) {
	out := new(ResponseOneUser)
	err := c.cc.Invoke(ctx, UsersService_GetOneUsers_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersServiceClient) PutOneUsers(ctx context.Context, in *IdUsers, opts ...grpc.CallOption) (*ResponseOneUser, error) {
	out := new(ResponseOneUser)
	err := c.cc.Invoke(ctx, UsersService_PutOneUsers_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// UsersServiceServer is the server API for UsersService service.
// All implementations must embed UnimplementedUsersServiceServer
// for forward compatibility
type UsersServiceServer interface {
	GetUsers(context.Context, *EmptyRequest) (*ResponseUsers, error)
	GetOneUsers(context.Context, *IdUsers) (*ResponseOneUser, error)
	PutOneUsers(context.Context, *IdUsers) (*ResponseOneUser, error)
	mustEmbedUnimplementedUsersServiceServer()
}

// UnimplementedUsersServiceServer must be embedded to have forward compatible implementations.
type UnimplementedUsersServiceServer struct {
}

func (UnimplementedUsersServiceServer) GetUsers(context.Context, *EmptyRequest) (*ResponseUsers, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUsers not implemented")
}
func (UnimplementedUsersServiceServer) GetOneUsers(context.Context, *IdUsers) (*ResponseOneUser, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetOneUsers not implemented")
}
func (UnimplementedUsersServiceServer) PutOneUsers(context.Context, *IdUsers) (*ResponseOneUser, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PutOneUsers not implemented")
}
func (UnimplementedUsersServiceServer) mustEmbedUnimplementedUsersServiceServer() {}

// UnsafeUsersServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to UsersServiceServer will
// result in compilation errors.
type UnsafeUsersServiceServer interface {
	mustEmbedUnimplementedUsersServiceServer()
}

func RegisterUsersServiceServer(s grpc.ServiceRegistrar, srv UsersServiceServer) {
	s.RegisterService(&UsersService_ServiceDesc, srv)
}

func _UsersService_GetUsers_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EmptyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServiceServer).GetUsers(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UsersService_GetUsers_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServiceServer).GetUsers(ctx, req.(*EmptyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UsersService_GetOneUsers_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(IdUsers)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServiceServer).GetOneUsers(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UsersService_GetOneUsers_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServiceServer).GetOneUsers(ctx, req.(*IdUsers))
	}
	return interceptor(ctx, in, info, handler)
}

func _UsersService_PutOneUsers_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(IdUsers)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServiceServer).PutOneUsers(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: UsersService_PutOneUsers_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServiceServer).PutOneUsers(ctx, req.(*IdUsers))
	}
	return interceptor(ctx, in, info, handler)
}

// UsersService_ServiceDesc is the grpc.ServiceDesc for UsersService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var UsersService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "protogrpc.UsersService",
	HandlerType: (*UsersServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetUsers",
			Handler:    _UsersService_GetUsers_Handler,
		},
		{
			MethodName: "GetOneUsers",
			Handler:    _UsersService_GetOneUsers_Handler,
		},
		{
			MethodName: "PutOneUsers",
			Handler:    _UsersService_PutOneUsers_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "usersgrpc.proto",
}
