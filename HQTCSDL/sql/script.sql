USE [QLCuaHang]
GO
/****** Object:  UserDefinedFunction [dbo].[AUTO_IDDH]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[AUTO_IDDH]()
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @ID1 VARCHAR(10)
	declare @ID int
	IF (SELECT COUNT(MaDH) FROM DONHANG) = 0
		SET @ID = '0'
	ELSE
		SELECT @ID1 = MAX(MaDH) FROM DONHANG
		
		set @ID=CONVERT(INT,RIGHT(@ID1, 8))
		SELECT @ID1 = CASE
			WHEN @ID >= 0 and @ID < 9 THEN 'DH0000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >= 9 THEN 'DH000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99 Then 'DH00000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999 Then 'DH0000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999 Then 'DH000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99999 Then 'DH00'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999999 Then 'DH0'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999999 Then 'DH'+ CONVERT(CHAR,@ID + 1)			
		END
	RETURN @ID1
END
GO
/****** Object:  UserDefinedFunction [dbo].[AUTO_IDH]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[AUTO_IDH]()
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @ID1 VARCHAR(10)
	declare @ID int
	IF (SELECT COUNT(MaH) FROM HANG) = 0
		SET @ID = '0'
	ELSE
		SELECT @ID1 = MAX(MaH) FROM HANG
		
		set @ID=CONVERT(INT,RIGHT(@ID1, 8))
		SELECT @ID1 = CASE
			WHEN @ID >= 0 and @ID < 9 THEN 'HH0000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >= 9 THEN 'HH000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99 Then 'HH00000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999 Then 'HH0000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999 Then 'HH000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99999 Then 'HH00'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999999 Then 'HH0'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999999 Then 'HH'+ CONVERT(CHAR,@ID + 1)			
		END
	RETURN @ID1
END
GO
/****** Object:  UserDefinedFunction [dbo].[AUTO_IDND]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[AUTO_IDND]()
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @ID1 VARCHAR(10)
	declare @ID int
	IF (SELECT COUNT(MAND) FROM NGUOIDUNG) = 0
		SET @ID = '0'
	ELSE
		SELECT @ID1 = MAX(MAND) FROM NGUOIDUNG
		
		set @ID=CONVERT(INT,RIGHT(@ID1, 8))
		SELECT @ID1 = CASE
			WHEN @ID >= 0 and @ID < 9 THEN 'ND0000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >= 9 THEN 'ND000000' + CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99 Then 'ND00000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999 Then 'ND0000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999 Then 'ND000'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=99999 Then 'ND00'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=999999 Then 'ND0'+ CONVERT(CHAR,@ID + 1)
			WHEN @ID >=9999999 Then 'ND'+ CONVERT(CHAR,@ID + 1)			
		END
	RETURN @ID1
END
GO
/****** Object:  Table [dbo].[LOAIHANG]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOAIHANG](
	[MaL] [char](15) NOT NULL,
	[TenL] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HANG]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HANG](
	[MaH] [char](15) NOT NULL,
	[TenH] [nvarchar](100) NOT NULL,
	[Gia] [int] NOT NULL,
	[SlCon] [int] NULL,
	[HinhAnh] [char](200) NULL,
	[ChiTiet] [nvarchar](3000) NULL,
	[MaL] [char](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[view_HANG]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[view_HANG]
as
select HANG.MaL, MaH, TenH, HinhAnh, SlCon, ChiTiet, Gia, TenL from HANG
inner join LOAIHANG
on LOAIHANG.MaL = HANG.MaL
GO
/****** Object:  Table [dbo].[NGUOIDUNG]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NGUOIDUNG](
	[HoTen] [nvarchar](100) NOT NULL,
	[MatKhau] [nvarchar](100) NULL,
	[Email] [nvarchar](50) NOT NULL,
	[SDT] [varchar](11) NULL,
	[MAND] [char](15) NOT NULL,
	[VaiTro] [nvarchar](20) NULL,
	[DiaChi] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[MAND] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DONHANG]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DONHANG](
	[MaH] [char](15) NOT NULL,
	[MaND] [char](15) NOT NULL,
	[MADH] [char](15) NOT NULL,
	[SLMua] [int] NOT NULL,
	[TongTien] [int] NULL,
	[TrangThai] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MADH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[view_DS_DONHANG]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[view_DS_DONHANG]
as
SELECT DONHANG.MaH, DONHANG.MAND, MADH, SLMua, TongTien,TenH, Gia, MaL, SlCon, HinhAnh, ChiTiet, HoTen, Email, SDT, VaiTro, DiaChi from DONHANG 
left join HANG on DONHANG.MaH= HANG.MaH 
left join NGUOIDUNG on NGUOIDUNG.MaND=DONHANG.MaND 
WHERE DONHANG.TrangThai != 1
GO
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai]) VALUES (N'HH00000001     ', N'ND00000007     ', N'DH00000001     ', 5, 225000, 0)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai]) VALUES (N'HH00000003     ', N'ND00000001     ', N'DH00000002     ', 3, 225000, 0)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai]) VALUES (N'HH00000003     ', N'ND00000002     ', N'DH00000003     ', 3, 225000, 0)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai]) VALUES (N'HH00000003     ', N'ND00000003     ', N'DH00000004     ', 2, 225000, 0)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai]) VALUES (N'HH00000003     ', N'ND00000004     ', N'DH00000005     ', 4, 1368000, 0)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai]) VALUES (N'HH00000003     ', N'ND00000005     ', N'DH00000006     ', 2, 225000, 0)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai]) VALUES (N'HH00000001     ', N'ND00000009     ', N'DH00000007     ', 3, 135000, 0)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai]) VALUES (N'HH00000001     ', N'ND00000026     ', N'DH00000008     ', 1, 45000, 1)
INSERT [dbo].[DONHANG] ([MaH], [MaND], [MADH], [SLMua], [TongTien], [TrangThai]) VALUES (N'HH00000003     ', N'ND00000026     ', N'DH00000009     ', 1, 342000, 1)
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000001     ', N'Book1', 45000, 123123084, N'http://localhost/HQTCSDL/images/book4.jpg                                                                                                                                                               ', N'', N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000002     ', N'Book2', 87000, 30, N'http://localhost/HQTCSDL/images/book1.jpg                                                                                                                                                               ', NULL, N'LH00000002     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000003     ', N'Book3', 342000, 208, N'as                                                                                                                                                                                                      ', NULL, N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000005     ', N'Book5', 53000, 231, N'6467                                                                                                                                                                                                    ', NULL, N'LH00000001     ')
INSERT [dbo].[HANG] ([MaH], [TenH], [Gia], [SlCon], [HinhAnh], [ChiTiet], [MaL]) VALUES (N'HH00000006     ', N'Book5', 12312312, 12312312, N'http://localhost/HQTCSDL/images/apps-big-data.jpg                                                                                                                                                       ', N'123', N'LH00000001     ')
INSERT [dbo].[LOAIHANG] ([MaL], [TenL]) VALUES (N'LH00000001     ', N'Sách')
INSERT [dbo].[LOAIHANG] ([MaL], [TenL]) VALUES (N'LH00000002     ', N'Bút')
INSERT [dbo].[LOAIHANG] ([MaL], [TenL]) VALUES (N'LH00000003     ', N'Vở')
INSERT [dbo].[LOAIHANG] ([MaL], [TenL]) VALUES (N'LH00000004     ', N'Cặp')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'Nguyễn Hưng', N'$2y$10$qRRcMJqwTsJY818lGw1m1O9obymJGF.P2a8plgywR/ccKz.SP2Ypy', N'hung@gmail.com', N'0929999998', N'ND00000002     ', N'phucvu', N'Hà Nội')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'234', N'234                           ', N'regerge', N'234', N'ND00000003     ', N'khachhang', N'')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'675', N'87                            ', N'ergererr34r34r43', N'67', N'ND00000004     ', N'khachhang', N'2342')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'', N'123                           ', N'234egerg', N'23', N'ND00000005     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'123                           ', N'ergerg', N'123', N'ND00000007     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'343                           ', N'erg', N'23', N'ND00000008     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'234                           ', N'23423', N'23423', N'ND00000009     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'234', N'43                            ', N'234324234re', N'12', N'ND00000010     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'34', N'43                            ', N'trer', N'43', N'ND00000012     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'234                           ', N'egeg', N'23423', N'ND00000014     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'234                           ', N'fgdg342', N'23423', N'ND00000015     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'234                           ', N'brb', N'23423', N'ND00000016     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'234                           ', N'grgerger', N'23423', N'ND00000017     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'234                           ', N'gwfgfd', N'23423', N'ND00000018     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'234                           ', N'344', N'23423', N'ND00000019     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'234                           ', N'ewfgegf', N'23423', N'ND00000020     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'234                           ', N'9789', N'23423', N'ND00000021     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'123                           ', N'234', N'123', N'ND00000022     ', N'khachhang', NULL)
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'12312', N'12312                         ', N'wefwefgew', N'21312', N'ND00000023     ', N'khachhang', N'21312')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'abc', N'password                      ', N'zxc123', N'678', N'ND00000024     ', N'khachhang', N'tttt')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'abc', N'123                           ', N'brtrfb324S', N'678', N'ND00000025     ', N'khachhang', N'9999')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123', N'$2y$10$FGQpno8fQreIAxpyKarW0Okb/ySrv9hU/HQFap3cvDiB.PHgPIHVO', N'123123', N'123', N'ND00000026     ', N'admin', N'123')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'234', N'$2y$10$p/dGHz4vBd7Yp6ShpiImgek0frE68Z5EW/kF8OwoD1QPuLXFV5fyC', N'fdgdfbe', N'234', N'ND00000027     ', N'khachhang', N'234')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'345', N'$2y$10$rNcIs/ATRMX.G3F8cEBlieiX9SxZTDgcBWX2X5Vv6JMXAPg3ys6Hy', N'feff', N'345', N'ND00000028     ', N'kho', N'345')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'1231231', N'$2y$10$15sRruDEnqnmTmoWwesFzu3e0sihyCe2oXk7uYS.yRwGd7vusSsOy', N'erfergergerg', N'23423423', N'ND00000029     ', N'khachhang', N'12312312')
INSERT [dbo].[NGUOIDUNG] ([HoTen], [MatKhau], [Email], [SDT], [MAND], [VaiTro], [DiaChi]) VALUES (N'123123', N'12312', N'12312312', N'12312', N'ND00000030     ', N'admin', N'12312')
SET ANSI_PADDING ON
GO
/****** Object:  Index [myUniqueConstraint]    Script Date: 10/15/2019 2:06:04 PM ******/
ALTER TABLE [dbo].[NGUOIDUNG] ADD  CONSTRAINT [myUniqueConstraint] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DONHANG] ADD  CONSTRAINT [DF_DONHANG_MADH]  DEFAULT ([dbo].[AUTO_IDDH]()) FOR [MADH]
GO
ALTER TABLE [dbo].[HANG] ADD  CONSTRAINT [DF_HANG_MaH]  DEFAULT ([dbo].[AUTO_IDH]()) FOR [MaH]
GO
ALTER TABLE [dbo].[NGUOIDUNG] ADD  CONSTRAINT [DF_NGUOIDUNG_MAND]  DEFAULT ([dbo].[AUTO_IDND]()) FOR [MAND]
GO
/****** Object:  StoredProcedure [dbo].[sp_DS_DONHANG]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_DS_DONHANG]
@MAND char(15)
as
begin
SELECT * from DONHANG 
inner join HANG on DONHANG.MaH= HANG.MaH 
inner join NGUOIDUNG on NGUOIDUNG.MaND=DONHANG.MaND 
WHERE NGUOIDUNG.MaND = @MAND and DONHANG.TrangThai != 1
end
GO
/****** Object:  StoredProcedure [dbo].[sp_TongTien_DonHang]    Script Date: 10/15/2019 2:06:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_TongTien_DonHang]
@mand char(15),
@tongtien int OUTPUT
as
begin
select @tongtien = sum(TongTien) from DONHANG  
WHERE MaND = @mand and TrangThai != '1'
end
GO
