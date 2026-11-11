import os
import zipfile

def create_pptx(output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    files = {}
    
    # [Content_Types].xml
    files['[Content_Types].xml'] = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slides/slide1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide2.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide3.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide4.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide5.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
</Types>'''.strip()

    # _rels/.rels
    files['_rels/.rels'] = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>'''.strip()

    # ppt/_rels/presentation.xml.rels
    files['ppt/_rels/presentation.xml.rels'] = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide2.xml"/>
  <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide3.xml"/>
  <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide4.xml"/>
  <Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide5.xml"/>
</Relationships>'''.strip()

    # ppt/presentation.xml
    files['ppt/presentation.xml'] = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <p:sldMasterIdLst>
    <p:sldMasterId id="2147483648" r:id="rId1"/>
  </p:sldMasterIdLst>
  <p:sldIdLst>
    <p:sldId id="256" r:id="rId2"/>
    <p:sldId id="257" r:id="rId3"/>
    <p:sldId id="258" r:id="rId4"/>
    <p:sldId id="259" r:id="rId5"/>
    <p:sldId id="260" r:id="rId6"/>
  </p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000" type="screen16x9"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>'''.strip()

    # ppt/slideMasters/slideMaster1.xml
    files['ppt/slideMasters/slideMaster1.xml'] = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr/>
    </p:spTree>
  </p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst>
    <p:sldLayoutId id="2147483649" r:id="rId1"/>
  </p:sldLayoutIdLst>
</p:sldMaster>'''.strip()

    # ppt/slideMasters/_rels/slideMaster1.xml.rels
    files['ppt/slideMasters/_rels/slideMaster1.xml.rels'] = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>'''.strip()

    # ppt/slideLayouts/slideLayout1.xml
    files['ppt/slideLayouts/slideLayout1.xml'] = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" type="blank">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr/>
    </p:spTree>
  </p:cSld>
</p:sldLayout>'''.strip()

    # ppt/slideLayouts/_rels/slideLayout1.xml.rels
    files['ppt/slideLayouts/_rels/slideLayout1.xml.rels'] = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>'''.strip()

    def make_slide(title, points):
        paras = []
        # Title
        paras.append(f'''<a:p>
          <a:pPr><a:defRPr sz="3200" b="1"><a:solidFill><a:srgbClr val="003366"/></a:solidFill></a:defRPr></a:pPr>
          <a:r><a:rPr lang="en-US" b="1"/><a:t>{title}</a:t></a:r>
        </a:p>''')
        # Subpoints
        for pt in points:
            paras.append(f'''<a:p>
              <a:pPr lvl="0"><a:defRPr sz="1800"><a:solidFill><a:srgbClr val="333333"/></a:solidFill></a:defRPr></a:pPr>
              <a:r><a:rPr lang="en-US"/><a:t>• {pt}</a:t></a:r>
            </a:p>''')
        joined_paras = "\\n".join(paras)
        
        return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr/>
      <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="2" name="ContentBox"/>
          <p:cNvSpPr txBox="1"/>
          <p:nvPr/>
        </p:nvSpPr>
        <p:spPr>
          <a:xfrm>
            <a:off x="800000" y="600000"/>
            <a:ext cx="10500000" cy="5500000"/>
          </a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" rtlCol="0"/>
          <a:lstStyle/>
          {joined_paras}
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
</p:sld>'''.strip()

    slides_data = [
        ("Idea2Odishi 2026 - Official Pitch Deck", [
            "Team / Participant Name(s): [Enter Your Name / Roll Number]",
            "Stream & Branch: [e.g., B.Tech CSE / ECE / MCA]",
            "Academic Year: [1st Year / 2nd Year]",
            "Event: Sankalp 2026 Tech Fest - NIST University",
            "Date of Presentation: March 28, 2026"
        ]),
        ("1. Problem Statement & Domain Context", [
            "Define the specific challenge being addressed in Odisha / Industry.",
            "Who is the target audience or beneficiary group?",
            "Current pain points and why existing solutions are insufficient.",
            "Relevance to technology, sustainability, or regional innovation."
        ]),
        ("2. Proposed Solution & Value Proposition", [
            "Describe your innovative product, platform, or methodology.",
            "Key features and distinctive differentiators.",
            "Why is this solution unique, practical, and scalable?",
            "High-level value proposition for stakeholders."
        ]),
        ("3. Technical Architecture & Implementation", [
            "Technology stack: AI/ML, Cloud, Web/Mobile, IoT, or Embedded Systems.",
            "System workflow or process pipeline diagram overview.",
            "Feasibility analysis: hardware/software prerequisites.",
            "Data safety, privacy, and system reliability considerations."
        ]),
        ("4. Impact, Viability & Roadmap", [
            "Expected social, economic, or institutional impact in Odisha.",
            "Implementation milestones: Prototype -> Pilot -> Production.",
            "Cost estimation, resource requirements, and risk mitigation.",
            "Conclusion & Q&A readiness."
        ])
    ]

    for idx, (title, points) in enumerate(slides_data, start=1):
        files[f'ppt/slides/slide{idx}.xml'] = make_slide(title, points)
        files[f'ppt/slides/_rels/slide{idx}.xml.rels'] = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>'''.strip()

    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for arcname, content in files.items():
            zf.writestr(arcname, content)
            
    print(f"Successfully generated presentation template at: {output_path}")

if __name__ == '__main__':
    create_pptx('public/templates/Idea2Odishi_Pitch_Template.pptx')

