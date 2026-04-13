export const awsSecurityGroupSnippet = `# AWS CLI — add inbound rules for each scanner IP
aws ec2 authorize-security-group-ingress \\
  --group-id sg-XXXXXXXX \\
  --protocol tcp \\
  --port 80-443 \\
  --cidr 52.54.123.45/32

aws ec2 authorize-security-group-ingress \\
  --group-id sg-XXXXXXXX \\
  --protocol tcp \\
  --port 80-443 \\
  --cidr 54.123.67.89/32

aws ec2 authorize-security-group-ingress \\
  --group-id sg-XXXXXXXX \\
  --protocol tcp \\
  --port 80-443 \\
  --cidr 34.56.78.90/32

aws ec2 authorize-security-group-ingress \\
  --group-id sg-XXXXXXXX \\
  --protocol tcp \\
  --port 80-443 \\
  --cidr 18.185.44.12/32

aws ec2 authorize-security-group-ingress \\
  --group-id sg-XXXXXXXX \\
  --protocol tcp \\
  --port 80-443 \\
  --cidr 13.212.99.77/32

aws ec2 authorize-security-group-ingress \\
  --group-id sg-XXXXXXXX \\
  --protocol tcp \\
  --port 80-443 \\
  --cidr 54.249.31.102/32`;

export const AzureNetworkecurityGroupSnippet = `# Azure CLI — create inbound allow rule
az network nsg rule create \\
  --resource-group <RG_NAME> \\
  --nsg-name <NSG_NAME> \\
  --name AllowVulnScanner \\
  --priority 100 \\
  --direction Inbound \\
  --protocol Tcp \\
  --destination-port-ranges 80 443 \\
  --source-address-prefixes 52.54.123.45, 54.123.67.89, 34.56.78.90, 18.185.44.12, 13.212.99.77, 54.249.31.102`;

export const GCPFirewallSnippet = `# GCP CLI — create ingress allow rule
gcloud compute firewall-rules create allow-vuln-scanner \\
  --direction=INGRESS \\
  --action=ALLOW \\
  --rules=tcp:80,tcp:443 \\
  --source-ranges=52.54.123.45/32,54.123.67.89/32,34.56.78.90/32,18.185.44.12/32,13.212.99.77/32,54.249.31.102/32`;

export const pfSenseSnippet = `# pfSense — Firewall > Rules > WAN (or your external interface)
# Add a rule for EACH scanner IP:
Action   : Pass
Interface: WAN
Protocol : TCP
Source   :
  - 52.54.123.45/32
  - 54.123.67.89/32
  - 34.56.78.90/32
  - 18.185.44.12/32
  - 13.212.99.77/32
  - 54.249.31.102/32
Dest Port: 80, 443
Description: Allow Vuln Scanner Inbound`;

export const ciscoAsaSnippet = `! Cisco ASA — allow scanner IPs inbound
object-group network VULN_SCANNERS
 network-object host 52.54.123.45
 network-object host 54.123.67.89
 network-object host 34.56.78.90
 network-object host 18.185.44.12
 network-object host 13.212.99.77
 network-object host 54.249.31.102
!
access-list OUTSIDE_IN extended permit tcp \\
  object-group VULN_SCANNERS any \\
  eq 80
access-list OUTSIDE_IN extended permit tcp \\
  object-group VULN_SCANNERS any \\
  eq 443`;

export const paloAltoSnippet = `# Palo Alto — Objects > Address Group > Security Policy
set address VULN_SCANNER_01 ip-netmask 52.54.123.45/32
set address VULN_SCANNER_02 ip-netmask 54.123.67.89/32
set address VULN_SCANNER_03 ip-netmask 34.56.78.90/32
set address VULN_SCANNER_04 ip-netmask 18.185.44.12/32
set address VULN_SCANNER_05 ip-netmask 13.212.99.77/32
set address VULN_SCANNER_06 ip-netmask 54.249.31.102/32

set address-group VULN_SCANNERS static [ \\
  VULN_SCANNER_01 VULN_SCANNER_02 VULN_SCANNER_03 VULN_SCANNER_04 VULN_SCANNER_05 VULN_SCANNER_06 ]

# Security Policy Rule
set security rulebase security rules allow-vuln-scanner \\
  source VULN_SCANNERS \\
  application [ web-browsing ssl ] \\
  action allow`;

export const fortigateSnippet = `# FortiGate — CLI config
config firewall address
  edit "vuln-scanner-01"
    set subnet 52.54.123.45 255.255.255.255
  next
  edit "vuln-scanner-02"
    set subnet 54.123.67.89 255.255.255.255
  next
  edit "vuln-scanner-03"
    set subnet 34.56.78.90 255.255.255.255
  next
  edit "vuln-scanner-04"
    set subnet 18.185.44.12 255.255.255.255
  next
  edit "vuln-scanner-05"
    set subnet 13.212.99.77 255.255.255.255
  next
  edit "vuln-scanner-06"
    set subnet 54.249.31.102 255.255.255.255
  next
end

config firewall addrgrp
  edit "vuln-scanners"
    set member "vuln-scanner-01" "vuln-scanner-02" "vuln-scanner-03" "vuln-scanner-04" "vuln-scanner-05" "vuln-scanner-06"
  next
end

config firewall policy
  edit 0
    set name "allow-vuln-scanner"
    set srcintf "wan1"
    set dstintf "internal"
    set srcaddr "vuln-scanners"
    set service "HTTP" "HTTPS"
    set action accept
  next
end`;

export const iptablesSnippet = `# iptables — add INPUT rules (run as root)
iptables -A INPUT -s 52.54.123.45/32 -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -s 52.54.123.45/32 -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -s 54.123.67.89/32 -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -s 54.123.67.89/32 -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -s 34.56.78.90/32 -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -s 34.56.78.90/32 -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -s 18.185.44.12/32 -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -s 18.185.44.12/32 -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -s 13.212.99.77/32 -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -s 13.212.99.77/32 -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -s 54.249.31.102/32 -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -s 54.249.31.102/32 -p tcp --dport 443 -j ACCEPT

# Persist rules (Debian/Ubuntu)
apt-get install iptables-persistent
netfilter-persistent save`;

export const snortSuricataSnippet = `# snort.conf / suricata.yaml — suppress scanner traffic
# Add to your passlist / suppress list:

# snort.conf
passlist: [52.54.123.45/32 54.123.67.89/32 34.56.78.90/32 18.185.44.12/32 13.212.99.77/32 54.249.31.102/32]

# suricata.yaml
suppress:
  - gen_id: 1
    sig_id: 0
    track: by_src
    ip: [52.54.123.45, 54.123.67.89, 34.56.78.90, 18.185.44.12, 13.212.99.77, 54.249.31.102]

# Or use threshold.conf to whitelist scanner IPs:
suppress gen_id 1, sig_id 0, track by_src, ip 52.54.123.45
suppress gen_id 1, sig_id 0, track by_src, ip 54.123.67.89
suppress gen_id 1, sig_id 0, track by_src, ip 34.56.78.90
suppress gen_id 1, sig_id 0, track by_src, ip 18.185.44.12
suppress gen_id 1, sig_id 0, track by_src, ip 13.212.99.77
suppress gen_id 1, sig_id 0, track by_src, ip 54.249.31.102`;

export const zeekSnippet = `# Zeek — local.zeek, add scanner IPs to whitelist
redef Site::local_nets += {
  52.54.123.45/32,
  54.123.67.89/32,
  34.56.78.90/32,
  18.185.44.12/32,
  13.212.99.77/32,
  54.249.31.102/32,
};

# Or use Intel framework to tag them as known-scanners
redef Intel::read_files += {
  "/etc/zeek/scanner-whitelist.dat"
};
# scanner-whitelist.dat format:
# 52.54.123.45  Intel::ADDR  vuln-scanner  -  -  T`;

export const qradarSnippet = `# QRadar — Admin > Network Hierarchy > Add scanner subnets
# Or use a Reference Set:

# CLI approach via QRadar API:
curl -X POST "https://<QRADAR_HOST>/api/reference_data/sets/VulnScanners/bulk_load" \\
  -H "SEC: <API_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"VulnScanners","element_type":"IP","data":["52.54.123.45","54.123.67.89","34.56.78.90","18.185.44.12","13.212.99.77","54.249.31.102"]}'

# Then reference "VulnScanners" in your BB/rule exclusions.`;

export const elasticSiemSnippet = `# Elastic SIEM — add scanner IPs to trusted_ips list
# Stack Management > Rules > Exception Lists

# Or via API:
curl -X POST "https://<KIBANA_HOST>/api/exception_lists/items" \\
  -H "kbn-xsrf: true" \\
  -H "Content-Type: application/json" \\
  -d '{
    "list_id": "endpoint_trusted_apps",
    "item_id": "vuln-scanner-ips",
    "type": "simple",
    "name": "Vulnerability Scanner IPs",
    "entries": [
      {
        "field": "source.ip",
        "operator": "included",
        "type": "match_any",
        "value": ["52.54.123.45", "54.123.67.89", "34.56.78.90", "18.185.44.12", "13.212.99.77", "54.249.31.102"]
      }
    ]
  }'`;

