// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.32.0
// 	protoc        v4.25.1
// source: question.proto

package pb

import (
	_ "google.golang.org/genproto/googleapis/api/annotations"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Request struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id            string                 `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	ImageQuestion string                 `protobuf:"bytes,2,opt,name=image_question,json=imageQuestion,proto3" json:"image_question,omitempty"`
	A             string                 `protobuf:"bytes,3,opt,name=A,proto3" json:"A,omitempty"`
	B             string                 `protobuf:"bytes,4,opt,name=B,proto3" json:"B,omitempty"`
	C             string                 `protobuf:"bytes,5,opt,name=C,proto3" json:"C,omitempty"`
	D             string                 `protobuf:"bytes,6,opt,name=D,proto3" json:"D,omitempty"`
	Answer        string                 `protobuf:"bytes,7,opt,name=answer,proto3" json:"answer,omitempty"`
	CreatedAt     *timestamppb.Timestamp `protobuf:"bytes,8,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
	UpdatedAt     *timestamppb.Timestamp `protobuf:"bytes,9,opt,name=updated_at,json=updatedAt,proto3" json:"updated_at,omitempty"`
}

func (x *Request) Reset() {
	*x = Request{}
	if protoimpl.UnsafeEnabled {
		mi := &file_question_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Request) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Request) ProtoMessage() {}

func (x *Request) ProtoReflect() protoreflect.Message {
	mi := &file_question_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Request.ProtoReflect.Descriptor instead.
func (*Request) Descriptor() ([]byte, []int) {
	return file_question_proto_rawDescGZIP(), []int{0}
}

func (x *Request) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Request) GetImageQuestion() string {
	if x != nil {
		return x.ImageQuestion
	}
	return ""
}

func (x *Request) GetA() string {
	if x != nil {
		return x.A
	}
	return ""
}

func (x *Request) GetB() string {
	if x != nil {
		return x.B
	}
	return ""
}

func (x *Request) GetC() string {
	if x != nil {
		return x.C
	}
	return ""
}

func (x *Request) GetD() string {
	if x != nil {
		return x.D
	}
	return ""
}

func (x *Request) GetAnswer() string {
	if x != nil {
		return x.Answer
	}
	return ""
}

func (x *Request) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

func (x *Request) GetUpdatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.UpdatedAt
	}
	return nil
}

type ResponseOne struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id   int32    `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Data *Request `protobuf:"bytes,2,opt,name=data,proto3" json:"data,omitempty"`
}

func (x *ResponseOne) Reset() {
	*x = ResponseOne{}
	if protoimpl.UnsafeEnabled {
		mi := &file_question_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ResponseOne) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ResponseOne) ProtoMessage() {}

func (x *ResponseOne) ProtoReflect() protoreflect.Message {
	mi := &file_question_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ResponseOne.ProtoReflect.Descriptor instead.
func (*ResponseOne) Descriptor() ([]byte, []int) {
	return file_question_proto_rawDescGZIP(), []int{1}
}

func (x *ResponseOne) GetId() int32 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *ResponseOne) GetData() *Request {
	if x != nil {
		return x.Data
	}
	return nil
}

type Responses struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id   int32      `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Data []*Request `protobuf:"bytes,2,rep,name=data,proto3" json:"data,omitempty"`
}

func (x *Responses) Reset() {
	*x = Responses{}
	if protoimpl.UnsafeEnabled {
		mi := &file_question_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Responses) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Responses) ProtoMessage() {}

func (x *Responses) ProtoReflect() protoreflect.Message {
	mi := &file_question_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Responses.ProtoReflect.Descriptor instead.
func (*Responses) Descriptor() ([]byte, []int) {
	return file_question_proto_rawDescGZIP(), []int{2}
}

func (x *Responses) GetId() int32 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *Responses) GetData() []*Request {
	if x != nil {
		return x.Data
	}
	return nil
}

type Id struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *Id) Reset() {
	*x = Id{}
	if protoimpl.UnsafeEnabled {
		mi := &file_question_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Id) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Id) ProtoMessage() {}

func (x *Id) ProtoReflect() protoreflect.Message {
	mi := &file_question_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Id.ProtoReflect.Descriptor instead.
func (*Id) Descriptor() ([]byte, []int) {
	return file_question_proto_rawDescGZIP(), []int{3}
}

func (x *Id) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

type Empty struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *Empty) Reset() {
	*x = Empty{}
	if protoimpl.UnsafeEnabled {
		mi := &file_question_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Empty) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Empty) ProtoMessage() {}

func (x *Empty) ProtoReflect() protoreflect.Message {
	mi := &file_question_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Empty.ProtoReflect.Descriptor instead.
func (*Empty) Descriptor() ([]byte, []int) {
	return file_question_proto_rawDescGZIP(), []int{4}
}

var File_question_proto protoreflect.FileDescriptor

var file_question_proto_rawDesc = []byte{
	0x0a, 0x0e, 0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x12, 0x09, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x67, 0x72, 0x70, 0x63, 0x1a, 0x1f, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d,
	0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1c, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74,
	0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x86, 0x02, 0x0a, 0x07, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x25, 0x0a, 0x0e, 0x69, 0x6d, 0x61, 0x67, 0x65, 0x5f,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0d,
	0x69, 0x6d, 0x61, 0x67, 0x65, 0x51, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x0c, 0x0a,
	0x01, 0x41, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x01, 0x41, 0x12, 0x0c, 0x0a, 0x01, 0x42,
	0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x01, 0x42, 0x12, 0x0c, 0x0a, 0x01, 0x43, 0x18, 0x05,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x01, 0x43, 0x12, 0x0c, 0x0a, 0x01, 0x44, 0x18, 0x06, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x01, 0x44, 0x12, 0x16, 0x0a, 0x06, 0x61, 0x6e, 0x73, 0x77, 0x65, 0x72, 0x18,
	0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x61, 0x6e, 0x73, 0x77, 0x65, 0x72, 0x12, 0x39, 0x0a,
	0x0a, 0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x08, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x63,
	0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x75, 0x70, 0x64, 0x61,
	0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x09, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54,
	0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x75, 0x70, 0x64, 0x61, 0x74, 0x65,
	0x64, 0x41, 0x74, 0x22, 0x45, 0x0a, 0x0b, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x4f,
	0x6e, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05, 0x52, 0x02,
	0x69, 0x64, 0x12, 0x26, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x61, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x12, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x67, 0x72, 0x70, 0x63, 0x2e, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x52, 0x04, 0x64, 0x61, 0x74, 0x61, 0x22, 0x43, 0x0a, 0x09, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x73, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x05, 0x52, 0x02, 0x69, 0x64, 0x12, 0x26, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x61, 0x18,
	0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x67, 0x72, 0x70,
	0x63, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x52, 0x04, 0x64, 0x61, 0x74, 0x61, 0x22,
	0x14, 0x0a, 0x02, 0x49, 0x64, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x02, 0x69, 0x64, 0x22, 0x07, 0x0a, 0x05, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x32, 0x9e,
	0x01, 0x0a, 0x08, 0x51, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x48, 0x0a, 0x03, 0x47,
	0x65, 0x74, 0x12, 0x0d, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x67, 0x72, 0x70, 0x63, 0x2e, 0x49,
	0x64, 0x1a, 0x16, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x67, 0x72, 0x70, 0x63, 0x2e, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x4f, 0x6e, 0x65, 0x22, 0x1a, 0x82, 0xd3, 0xe4, 0x93, 0x02,
	0x14, 0x12, 0x12, 0x2f, 0x67, 0x65, 0x74, 0x2d, 0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e,
	0x2f, 0x7b, 0x69, 0x64, 0x7d, 0x12, 0x48, 0x0a, 0x06, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x12,
	0x10, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x67, 0x72, 0x70, 0x63, 0x2e, 0x45, 0x6d, 0x70, 0x74,
	0x79, 0x1a, 0x14, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x67, 0x72, 0x70, 0x63, 0x2e, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x73, 0x22, 0x16, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x10, 0x12,
	0x0e, 0x2f, 0x67, 0x65, 0x74, 0x2d, 0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x42,
	0x11, 0x5a, 0x0f, 0x67, 0x72, 0x70, 0x63, 0x2d, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2f,
	0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_question_proto_rawDescOnce sync.Once
	file_question_proto_rawDescData = file_question_proto_rawDesc
)

func file_question_proto_rawDescGZIP() []byte {
	file_question_proto_rawDescOnce.Do(func() {
		file_question_proto_rawDescData = protoimpl.X.CompressGZIP(file_question_proto_rawDescData)
	})
	return file_question_proto_rawDescData
}

var file_question_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_question_proto_goTypes = []interface{}{
	(*Request)(nil),               // 0: protogrpc.Request
	(*ResponseOne)(nil),           // 1: protogrpc.ResponseOne
	(*Responses)(nil),             // 2: protogrpc.Responses
	(*Id)(nil),                    // 3: protogrpc.Id
	(*Empty)(nil),                 // 4: protogrpc.Empty
	(*timestamppb.Timestamp)(nil), // 5: google.protobuf.Timestamp
}
var file_question_proto_depIdxs = []int32{
	5, // 0: protogrpc.Request.created_at:type_name -> google.protobuf.Timestamp
	5, // 1: protogrpc.Request.updated_at:type_name -> google.protobuf.Timestamp
	0, // 2: protogrpc.ResponseOne.data:type_name -> protogrpc.Request
	0, // 3: protogrpc.Responses.data:type_name -> protogrpc.Request
	3, // 4: protogrpc.Question.Get:input_type -> protogrpc.Id
	4, // 5: protogrpc.Question.GetAll:input_type -> protogrpc.Empty
	1, // 6: protogrpc.Question.Get:output_type -> protogrpc.ResponseOne
	2, // 7: protogrpc.Question.GetAll:output_type -> protogrpc.Responses
	6, // [6:8] is the sub-list for method output_type
	4, // [4:6] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_question_proto_init() }
func file_question_proto_init() {
	if File_question_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_question_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Request); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_question_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ResponseOne); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_question_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Responses); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_question_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Id); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_question_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Empty); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_question_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_question_proto_goTypes,
		DependencyIndexes: file_question_proto_depIdxs,
		MessageInfos:      file_question_proto_msgTypes,
	}.Build()
	File_question_proto = out.File
	file_question_proto_rawDesc = nil
	file_question_proto_goTypes = nil
	file_question_proto_depIdxs = nil
}